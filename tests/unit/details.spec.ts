import { shallowMount } from '@vue/test-utils'
import Details from '@/components/Details.vue'

describe('Details.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Details, {
      propsData: {}
    })
    const vm = wrapper.vm as unknown
    expect((vm as any).editDetails).toBeDefined();
  })

  it('Data should be fetched ', () => {
    const wrapper = shallowMount(Details, {
      propsData: {}
    })
    const vm = wrapper.vm as unknown
    expect((vm as any).getTableData).toBeDefined();
  })
})
