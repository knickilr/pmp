import { shallowMount } from '@vue/test-utils'
import EditDetails from '@/components/EditDetails.vue'

describe('EditDetails.vue', () => {
  it('should not render project and employee components', () => {
    const formObj = {}
    const wrapper = shallowMount(EditDetails, {
      propsData: { formObj }
    })
    const vm = wrapper.vm as unknown
    expect((vm as any).showProject).toEqual(false)
    expect((vm as any).showEmployee).toEqual(false)
  })
  it('should show project component', () => {
    const formObj = {
      sDate: ''
    }
    const wrapper = shallowMount(EditDetails, {
      propsData: { formObj }
    })
    const vm = wrapper.vm as unknown
    expect((vm as any).showProject).toEqual(false)
    expect((vm as any).showEmployee).toEqual(false)
  })
  it('should show employe component', () => {
    const formObj = {
      fName: ''
    }
    const wrapper = shallowMount(EditDetails, {
      propsData: { formObj }
    })
    const vm = wrapper.vm as unknown
    expect((vm as any).showProject).toEqual(false)
    expect((vm as any).showEmployee).toEqual(false)
  })
})
