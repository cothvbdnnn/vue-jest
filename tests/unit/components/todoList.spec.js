import { shallowMount } from "@vue/test-utils"
import TodoList from '@/components/TodoList'
import Todo from '@/components/Todo'

describe('Test TodoList', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TodoList)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('TEST CASE 1: Renders title', () => {
    const listName = 'Title'
    wrapper = shallowMount(TodoList, {
      propsData: {
        listName: listName
      }
    })
    expect(wrapper.find('h1').text()).toContain(listName)
  })
  it('TEST CASE 2: Renders a lists', () => {
    const wrapper = shallowMount(TodoList)
    expect(wrapper.findAllComponents(Todo).length).toBe(3)
  })
  it('TEST CASE 3: Delete todo', async () => {
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
  it('TEST CASE 4: Add todo', async () => {
    const newTodo = 'new'
    await wrapper.vm.addTodo(newTodo)
    expect(wrapper.find('ul').html()).toContain(newTodo)
  })
  it('TEST CASE 5: Toggle Todo', () => {
    wrapper.vm.toggleTodo(wrapper.vm.todos[0])
    expect(wrapper.vm.todos[0].completed).toBe(true)
  })
  it('TEST CASE 6: Edit Todo', () => {
    const newDes = 'test'
    wrapper.vm.editTodo(wrapper.vm.todos[0], newDes)
    expect(wrapper.vm.todos[0].description).toEqual(newDes)
  })
})