import { shallowMount } from "@vue/test-utils"
import TodoList from '@/components/TodoList'
import Todo from '@/components/Todo'

describe('TodoList', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TodoList)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Render the title', () => {
    const listName = 'Title'
    wrapper = shallowMount(TodoList, {
      propsData: {
        listName: listName
      }
    })
    expect(wrapper.find('h1').text()).toContain(listName)
  })
  it('Render a list', () => {
    const wrapper = shallowMount(TodoList)
    expect(wrapper.findAllComponents(Todo).length).toBe(3)
  })
  it('Delete todo', async () => {
    const obj = {
      description: "Do it",
      completed: false
    }
    wrapper = shallowMount(TodoList, {
      data() {
        return {
          todos: [obj]
        }
      }
    })
    await wrapper.vm.deleteTodo(obj)
    expect(wrapper.find('ul').html()).not.toContain(obj.description)
  })
  it('Add todo', async () => {
    const newTodo = 'new'
    await wrapper.vm.addTodo(newTodo)
    expect(wrapper.find('ul').html()).toContain(newTodo)
  })
  it('Toggle Todo', () => {
    wrapper.vm.toggleTodo(wrapper.vm.todos[0])
    expect(wrapper.vm.todos[0].completed).toBe(true)
  })
  it('Edit Todo', () => {
    const newDes = 'test'
    wrapper.vm.editTodo(wrapper.vm.todos[0], newDes)
    expect(wrapper.vm.todos[0].description).toEqual(newDes)
  })
})