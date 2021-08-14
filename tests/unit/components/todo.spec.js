import { shallowMount } from "@vue/test-utils";
import Todo from '@/components/Todo'

describe('Todo', () => {
  const description = 'Do it'
  let wrapper
  const config = {
    propsData: {
      description: description
    }
  }
  beforeEach(() => {
    wrapper = shallowMount(Todo, config)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Is a todo', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  it('Render the todo', () => {
    expect(wrapper.find('.des').text()).toContain(description)
  })
  it('Emit event when button remove is clicked', () => {
    wrapper.find('.btn-remove').trigger('click')
    expect(wrapper.emitted('on-delete')).toBeTruthy()
  })
  it('Toggle form when button edit is clicked', async () => {
    const fn = jest.spyOn(Todo.methods, 'finishEditing')
    wrapper = shallowMount(Todo, config)
    await wrapper.find('.btn-edit').trigger('click')
    const form = wrapper.find("form")
    expect(form.exists()).toBe(true)
    expect(wrapper.vm.newTodoDescription).toBe(description)
    await wrapper.find('.btn-edit').trigger('click')
    expect(fn).toHaveBeenCalled()
  })
  it('Finish edit when submit', async () => {
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
