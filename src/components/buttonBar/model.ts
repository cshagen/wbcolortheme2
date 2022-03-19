import { reactive } from 'vue'
import { Modal } from 'bootstrap'

export const modalConfig = reactive({
  showSelectModal : [] as number[],
 // selectModal : new Modal("") ,
  chargePointToConfigure : 0
})

