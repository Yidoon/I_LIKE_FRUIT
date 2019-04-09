import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bannerList: [],
    bestRecommandList: [],
    otherRecommandList: [],
    currentPage: 'home',
    userStatus: {
      isLogin: false,
      token: window.localStorage.getItem('token')
    },
    detailInfo: '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    isCollected: false,
    isAdmired: false
  },
  mutations: {
    getBanner (state, data) {
      state.bannerList = data.data;
      state.userStatus.isLogin = data.isLogin
      state.userInfo = data.userInfo
      localStorage.setItem( 'userInfo', JSON.stringify(data.userInfo))
    },
    setState (state, stateData) {
      console.log('aa',stateData)
      state.detailInfo = stateData.detailInfo
      console.log(state)
    },
    getBestRecommand (state, data) {
      state.bestRecommandList = data.data
    },
    getOtherRecommand (state, data) {
      state.otherRecommandList = data.data
    },
    setDetail (state, data) {
      state.detailInfo = data
    },
    setCurrentPage (state, currentPage) {
      state.currentPage = currentPage
    },
    judgeIsCollected (state, isCollected) {
      state.isCollected = isCollected
    },
    judgeIsAdmired (state, isAdmired) {
      state.isAdmired = isAdmired
    },
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    getBanner ({commit}) {
      axios.get('/api/home/getBanner').then((res) => {
        commit('getBanner', res.data)
      })
    },
    getBestRecommand ({commit}) {
      axios.get('/api/home/getBestRecommand').then((res) => {
        commit('getBestRecommand', res.data)
      })
    },
    getOtherRecommand ({commit}) {
      axios.get('/api/home/getOtherRecommand').then((res) => {
        commit('getOtherRecommand', res.data)
      })
    },
    register ({commit}, params) {
      axios.post('/api/user/register', params).then(res => {
        console.log(res)
      })
    },
    setDetail ({commit}, detailData) {
      commit('setDetail', detailData)
    },
    setCurrentPage ({commit}, currentPage) {
      commit('setCurrentPage', currentPage)
    },
    login ({commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post('/api/user/login', params).then(res => {
          if (res.data.error === 0) {
            console.log('token', res.data.token)
            window.localStorage.setItem('token', res.data.token)
            resolve(res)
          } else {
            reject(res.data.msg)
          }
        })
      })
    },
    collectFruit ({commit, state}) {
      return new Promise((resolve, reject) => {
        const data = {id: state.detailInfo._id}
        axios.post('/api/user/collectFruit', data).then((res) => {
          if (res.data.error === 0) {
            const data = {
              msg: '收藏成功',
              error: 0
            }
            resolve(data)
          } else {
            reject('收藏失败')
          }
        })
      })
    },
    admireFruit ({commit, state}) {
      return new Promise((resolve, reject) => {
        const data = {id: state.detailInfo._id}
        axios.post('/api/user/admireFruit', data).then(res => {
          if (res.data.error === 0) {
            const data = {
              msg: '点赞成功',
              error: 0
            }
            resolve(data)
          } else {
            reject('点赞失败')
          }
        })
      })
    },
    // 判断是否被收藏
    judgeIsAdmiredAndAdmired ({commit, state}) {
      const detailInfo = state.detailInfo
      console.log( 'ss', state.userInfo)
      const userCollected = state.userInfo.collected_list
      const userAdmired = state.userInfo.admired_list
      commit('judgeIsCollected', false)
      commit('judgeIsAdmired', false)
      userCollected.forEach(element => {
        // console.log(element._id === detailInfo._id)
        if (element._id === detailInfo._id) {
          commit('judgeIsCollected', true)
        }
      });
      userAdmired.forEach(element => {
        console.log(element._id === detailInfo._id)
        if (element._id === detailInfo._id) {
          commit('judgeIsAdmired', true)
        }
      });
    },
    // 取消收藏
    cancleCollect ({commit, state}) {
      const detailInfo = state.detailInfo
      return new Promise((resolve, reject) => {
        const data = {id: detailInfo._id}
        axios.post('/api/user/cancleCollect', data).then(res => {
          if (res.data.error === 0) {
            commit('judgeIsCollected', false)
            const data = {
              msg: '取消成功'
            }
            resolve(data)
          } else {
            const data = {
              msg: '操作失败'
            }
            reject(data)
          }
        })
      })
    },
    cancleAdmire ({commit, state}) {
      const detailInfo = state.detailInfo
      return new Promise((resolve, reject) => {
        const data = {id: detailInfo._id}
        axios.post('/api/user/cancleAdmire', data).then(res => {
          if (res.data.error === 0) {
            commit('judgeIsAdmired', false)
            const data = {
              msg: '取消成功'
            }
            resolve(data)
          } else {
            const data = {
              msg: '操作失败'
            }
            reject(data)
          }
        })
      })
    },
    // 请求用户的信息并将其存储到localstorage中
    getUserInfo ({commit, state}) {
      axios.get('/api//user/getUserInfo').then(res => {
        if (res.data.error === 0) {
          console.log('app', res.data.data)
          commit('setUserInfo', res.data.data)
          localStorage.setItem('userInfo', JSON.stringify(res.data.data))
        }
      }).catch( error => {
        console.log(error)
      })
    }
  }
})
