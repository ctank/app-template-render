<template>
  <div class="atp-subform">
    <div class="atp-subform__label"></div>
    <div class="atp-subform__content">
      <div class="atp-subform__action">
        <!-- <template v-for="btn in extras.operations">
          <el-button
            v-if="isAdmin || checkPermission(btn.permission)"
            :key="btn.buttonEvent"
            :type="btn.buttonType"
            @click="handleBtnClick(btn.buttonEvent)"
          >
            {{ btn.buttonName }}
          </el-button>
        </template> -->
        <div class="atp-subform__action--left">
          <el-button type="primary">test</el-button>
        </div>
        <div class="atp-subform__action--right">
          <el-input
            v-if="showSearchInput"
            v-model="searchKeyword"
            class="atp-subform__search"
            placeholder="请输入"
          />
          <el-button v-else text @click.stop="handleSearchShow">
            <el-icon class="mr-2"><Search /></el-icon>搜索
          </el-button>
          <el-button text>
            <el-icon class="mr-2"><Filter /></el-icon>过滤
          </el-button>
          <el-button text>
            <el-icon class="mr-2"><View /></el-icon>显示列
          </el-button>
        </div>
      </div>

      <el-form label-width="0px">
        <el-table :data="subFormValue" stripe border style="width: 100%">
          <!-- 选择列 -->
          <el-table-column
            v-if="extras.checkBox"
            type="selection"
            fixed="left"
            :width="40"
            align="center"
          ></el-table-column>
          <!-- 序号列 -->
          <el-table-column
            label="序号"
            v-if="extras.showNum"
            fixed="left"
            :width="60"
            align="center"
          >
            <template #default="{ $index }"> {{ $index + 1 }} </template>
          </el-table-column>
          <template v-for="(column, index) in extras.columns">
            <el-table-column
              v-if="column.type === 'field'"
              :key="`field-${index}`"
              :label="column.label"
              :width="column.width || ''"
              :align="column.align || 'left'"
            >
              <template #default="{ row, $index }">
                <column-content
                  :row="row"
                  :column="column"
                  :isEdit="editIndex === $index"
                  :componentMap="columnComponentMap"
                  @click="handleColBtnClick(column.clickEvent, row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-else
              fixed="right"
              :key="`button-${index}`"
              :label="column.label"
              :width="column.width || ''"
              :align="column.align || 'left'"
            >
              <template #default="{ row, $index }">
                <template v-for="btn in column.actionConfig">
                  <el-button
                    v-if="
                      getComponentDisplay(row, btn) && (isAdmin || checkPermission(btn.permission))
                    "
                    :key="btn.buttonEvent"
                    :type="btn.buttonType"
                    link
                    @click="handleColBtnClick(btn.buttonEvent, row)"
                  >
                    {{ btn.buttonName }}
                  </el-button>
                </template>
              </template>
            </el-table-column>
          </template>

          <!-- 行内编辑 -->
          <el-table-column
            label="操作"
            v-if="extras.rowEdit"
            fixed="right"
            :width="120"
            align="center"
          >
            <template #default="{ row, $index }">
              <div v-if="editIndex !== $index">
                <el-button @click="handleRowEdit($index)" link>编辑</el-button>
                <el-button v-if="extras.rowDelete" @click="handleRowDelete(row, $index)" link
                  >删除</el-button
                >
              </div>
              <div v-else>
                <el-button @click="handleRowSave(row, $index)" link>保存</el-button>
                <el-button @click="handleRowCancel($index)" link>取消</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <el-pagination
        small
        background
        class="atp-subform__pagination"
        layout="sizes, prev, pager, next"
        :total="30"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import base from '../base.vue'
import {
  validEnglish,
  validNumberOrEnglish,
  validEmail,
  validIdCard,
  validPhone,
  cloneDeep
} from '../../../utils/common'
import ColumnContent from './columnContent.vue'

export default defineComponent({
  name: 'SubForm',
  extends: base,
  components: { ColumnContent },
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    required: {
      type: Boolean,
      default() {
        return false
      }
    },
    placeholder: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      showSearchInput: false,
      searchKeyword: '',
      editIndex: -1,
      subFormValue: []
    }
  },
  computed: {
    columnComponentMap() {
      const obj = {}
      this.extras.columns.forEach((column) => {
        if (
          column.type === 'field' &&
          column.fieldSet &&
          column.fieldSet.type &&
          column.fieldSet.componentId
        ) {
          obj[column.fieldSet.componentId] = this.subFormComponents.find(
            (item) => item.id === column.fieldSet.componentId
          )
        }
      })
      return obj
    }
  },
  // watch: {
  //   value() {
  //     this.setDefaultValue()
  //   }
  // },
  created() {
    this.setRules()
    document.addEventListener('click', this.checkSearchInput)
  },
  mounted() {
    this.subFormValue = cloneDeep(this.value)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.checkSearchInput)
  },
  methods: {
    checkSearchInput(e) {
      if (
        e.target.className.indexOf('atp-subform__search') >= 0 ||
        (e.target.parentNode &&
          e.target.parentNode.className &&
          e.target.parentNode.className.indexOf('atp-subform__search') >= 0) ||
        (e.target.parentNode.parentNode &&
          e.target.parentNode.parentNode.className &&
          e.target.parentNode.parentNode.className.indexOf('atp-subform__search') >= 0)
      ) {
        this.showSearchInput = true
      } else {
        this.showSearchInput = false
      }
    },
    /**
     * [setRules 设置验证规则]
     */
    setRules() {
      if (this.rules) {
        const title = this.title

        if (this.required) {
          this.rules.push({
            required: true,
            message: `${title}不能为空`,
            trigger: 'blur'
          })
        }

        if (this.extras) {
          switch (this.extras.validType) {
            // 判断校验类型
            case 'english':
              // 英文
              this.rules.push({
                validator: (rules, value, callback) => {
                  if (!validEnglish(value)) {
                    // callback(`${title}请填写英文`)
                    callback(new Error('请输入英文'))
                    return
                  }
                  callback()
                },
                trigger: 'change'
              })
              break
            case 'numberEnglish':
              // 数字或英文
              this.rules.push({
                validator: (rules, value, callback) => {
                  if (!validNumberOrEnglish(value)) {
                    // callback(`${title}请填写数字或英文`)
                    callback(new Error('请输入数字或英文'))
                    return
                  }
                  callback()
                },
                trigger: 'change'
              })
              break
            case 'email':
              // 邮箱
              this.rules.push({
                validator: (rules, value, callback) => {
                  if (!validEmail(value)) {
                    callback(new Error('请输入正确的邮箱'))
                    return
                  }
                  callback()
                },
                trigger: 'blur'
              })
              break
            case 'idcard':
              // 身份证号
              this.rules.push({
                validator: (rules, value, callback) => {
                  if (!validIdCard(value)) {
                    callback(new Error('请输入身份证号码'))
                    return
                  }
                  callback()
                },
                trigger: 'blur'
              })
              break
            case 'phone':
              // 手机号
              this.rules.push({
                validator: (rules, value, callback) => {
                  if (!validPhone(value)) {
                    callback(new Error('请输入正确的手机号码'))
                    return
                  }
                  callback()
                },
                trigger: 'blur'
              })
              break
            // case 'bankAccount':
            //   // 银行卡号
            //   this.rules.push({
            //     validator: (rules, value, callback) => {
            //       if (value !== '' && !Validator.validBankAccount(value)) {
            //         callback(`${title}请填写银行卡号格式`)
            //         return
            //       }
            //       callback()
            //     },
            //     trigger: 'blur'
            //   })
            //   break
          }

          const minLength = parseInt(this.extras.minLength)
          const maxLength = parseInt(this.extras.maxLength)
          if (!isNaN(minLength) && !isNaN(maxLength)) {
            // 最大最小长度都需要验证
            this.rules.push({
              validator: (rules, value, callback) => {
                if (
                  typeof value === 'string' &&
                  value.length &&
                  (value.length < minLength || value.length > maxLength)
                ) {
                  callback(new Error(`字符长度必须在${minLength}和${maxLength}之间`))
                  return
                }
                callback()
              },
              trigger: 'blur'
            })
          } else if (!isNaN(minLength)) {
            // 只需验证最小长度
            this.rules.push({
              validator: (rules, value, callback) => {
                if (typeof value === 'string' && value.length && value.length < minLength) {
                  callback(new Error(`至少输入${minLength}个字符`))
                  return
                }
                callback()
              },
              trigger: 'blur'
            })
          } else if (!isNaN(maxLength)) {
            // 只需验证最大长度
            this.rules.push({
              validator: (rules, value, callback) => {
                if (typeof value === 'string' && value.length && value.length > maxLength) {
                  callback(new Error(`最多可输入${maxLength}个字符`))
                  return
                }
                callback()
              },
              trigger: 'blur'
            })
          }
          // 默认不能大于128
          // 【流程建模--- 武探星测试进销存相关应用”下面的【单文本流程】建立 一个新流程，查看【单行文本2】后面输入框的提示信息，是“请填写”，跟需求不符，需求是“请输入内容”，另外 ，当输入内容超长，超过输入框的长度时，后面的内容以...显示，跟需求不符】https://www.tapd.cn/49578510/bugtrace/bugs/view?bug_id=1149578510001023656
          this.rules.push({
            validator: (rules, value, callback) => {
              if (typeof value === 'string' && value.length && value.length > 128) {
                callback(new Error(`${title}的长度不能大于128`))
                return
              }
              callback()
            },
            trigger: 'change'
          })
        }
      }
    },

    setDefaultValue() {
      if (this.extras.defaultValue && !this.value) {
        this.$emit('change', this.extras.defaultValue, this.id)
      }
    },

    handleSearchShow() {
      this.showSearchInput = true
    },

    handleBtnClick(event) {
      const data = {}
      if (this.extras.checkBox) {
        const table = this.$refs.listViewTable
        data.selections = table.getSelectionRows() || []
      }
      this.onEvent(event, data)
    },
    handleColBtnClick(event, row) {
      if (event) {
        this.onEvent(event, row)
      } else {
        // console.log('未配置相关事件')
      }
    },
    handlePaginationCurrentChange(val) {
      this.onEvent('currentChange', val)
    },
    handlePaginationSizeChange(val) {
      this.onEvent('sizeChange', val)
    },

    handleRowEdit(index) {
      this.editIndex = index
    },

    handleRowDelete(row, index) {
      this.onEvent('onDelete', {
        data: row,
        key: this.id
      })
      this.subFormValue.splice(index, 1)
      this.value = cloneDeep(this.subFormValue)
    },

    handleRowSave(row, index) {
      this.onEvent('onSave', {
        data: row,
        key: this.id
      })
      this.editIndex = -1
      this.value[index] = cloneDeep(this.subFormValue[index])
    },

    handleRowCancel(index) {
      this.editIndex = -1
      this.subFormValue[index] = cloneDeep(this.value[index])
    }
  }
})
</script>

<style lang="scss">
.atp-subform {
  .atp-subform__action {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .atp-subform__action--right {
    display: flex;
  }

  .atp-subform__search + .el-button {
    margin-left: 12px;
  }

  .atp-subform__pagination {
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
