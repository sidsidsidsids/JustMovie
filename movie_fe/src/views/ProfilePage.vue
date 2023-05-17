<template>
  <div>
  <!-- 모달 부분 -->
    <div class="row">
      <div class="col text-center pt-2">
        <button
          id="changeButton"
          type="button"
          @click="
            showModal = true
            enableClose = false
          "
        >
          프로필 수정
        </button>
      </div>
    </div>
    <Modal v-model="showModal" 
    :title="enableClose ? 'Closable modal' : 'Unclosable modal'" 
    :enable-close="enableClose"
    wrapper-class="modal-wrapper"
    class='model-footer'>
      <div class="row">
        <div v-if="!enableClose" class="col">
          <div class="alert alert-warning mt-1" role="alert">
            <p class="mb-1"><strong>WARNING: </strong></p>
            <p>인풋 넣어야 나갈 수 있음</p>
            <br>
          </div>
        </div>
        <div v-else class="col">
          <p>나갈 수 있는 상태</p>
        </div>
      </div>
      <button
        type="button"
        @click="enableClose = !enableClose"
        id="outBtn"
      >
        <!-- :style="['btn btn-secondary', 
        enableClose ? 'btn-danger' : 'btn-success']" -->
        {{ enableClose ? 'Disable' : 'Enable' }} closing
      </button>
    </Modal>
  <!-- 모달 부분 끝 -->
  </div>
</template>

<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'

export default {
  components: {
    Modal: VueModal
  },
  data() {
    return {
      showModal: false,
      enableClose: false
    }
  },
  methods:{
    checkModal(){
      console.log('aaa')
    }
  }
};
</script>

<style>
#changeButton{
  background-color: greenyellow;
}
.modal-footer {
  padding: 15px 0px 0px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: -14px;
  margin-right: -14px;
}
.modal-wrapper {
  display: flex;
  align-items: center;
}
.modal-wrapper .vm {
  top: auto;
}
#outBtn {
  background-color: grey;
  color: #e5e5e5;
}
</style>