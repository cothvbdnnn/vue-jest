import { shallowMount } from "@vue/test-utils";
import Todo from '@/components/Todo'


describe('Test Todo', () => {

  const description = 'Do it'
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Todo, {
      propsData: {
        description: description
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('TEST CASE 1: Is a todo', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  it('TEST CASE 2: Render the todo', () => {
    expect(wrapper.find('.des').text()).toContain(description)
  })
  it('TEST CASE 3: Emit event when button remove is clicked', () => {
    wrapper.find('.btn-remove').trigger('click')
    expect(wrapper.emitted('on-delete')).toBeTruthy()
  })
  it('TEST CASE 4: Start edit when button edit is clicked', async () => {
    await wrapper.find('.btn-edit').trigger('click')
    const form = wrapper.find("form")
    expect(form.exists()).toBe(true)
    expect(wrapper.vm.newTodoDescription).toBe(description)
  })
  it('TEST CASE 5: Finish edit when submit', async () => {
    await wrapper.find('.btn-edit').trigger('click')
    const form = wrapper.find("form")
    expect(form.exists()).toBe(true)
    const textEdit = 'hihi'
    await wrapper.find('input').setValue(textEdit)
    expect(wrapper.vm.newTodoDescription).toBe(textEdit)
    await form.trigger('submit.prevent')
    expect(wrapper.find("form").exists()).toBe(false)
    expect(wrapper.emitted('on-edit')[0][0]).toEqual(textEdit)
  })
})
