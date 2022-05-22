export default {
  namespaced: true,
  state: {
    // 全局弹窗列表
    dialogList: []
  },
  actions: {
    addDialog({ commit }, dialog) {
      commit('addDialog', dialog)
    },
    openDialog({ commit }, key) {
      commit('openDialog', key)
    },
    closeDialog({ commit }, key) {
      commit('closeDialog', key)
    },
    updateDialog({ commit }, dialog) {
      commit('updateDialog', dialog)
    },
    removeDialog({ commit }, key) {
      commit('removeDialog', key)
    },
    setDialogButtonLoading({ commit }, data) {
      commit('setDialogButtonLoading', data)
    }
  },
  mutations: {
    addDialog(state, dialog) {
      state.dialogList.push(dialog)
    },
    openDialog(state, key) {
      state.dialogList.forEach((dialog) => {
        if (dialog.key === key) {
          if (dialog.meta.isDestroyByClose) {
            dialog.render = true
          }
          dialog.show = true
          return false
        }
      })
    },
    updateDialog(state, dialog) {
      let findIndex = null
      state.dialogList.forEach((item, index) => {
        if (item.key === dialog.key) {
          findIndex = index
          return false
        }
      })
      if (findIndex !== null) {
        state.dialogList[findIndex] = dialog
      }
    },
    closeDialog(state, key) {
      state.dialogList.forEach((dialog) => {
        if (dialog.key === key) {
          dialog.show = false
          if (dialog.meta.isDestroyByClose) {
            dialog.render = false
          }
          return false
        }
      })
    },
    removeDialog(state, key) {
      let findIndex = null
      state.dialogList.forEach((dialog, index) => {
        if (dialog.key === key) {
          findIndex = index
          return false
        }
      })
      if (findIndex !== null) {
        state.dialogList.splice(findIndex, 1)
      }
    },
    setDialogButtonLoading(state, data) {
      if (data) {
        state.dialogList.forEach((dialog, index) => {
          if (dialog.key === data.key) {
            if (data.btnId === 'confirm') {
              dialog.confirmBtnLoading = data.value
            } else if (data.btnId === 'cancel') {
              dialog.cancelBtnLoading = data.value
            }
            return false
          }
        })
      }
    }
  }
}
