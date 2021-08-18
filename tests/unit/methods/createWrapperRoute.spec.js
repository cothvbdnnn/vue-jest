import CreateTodo from '@/components/CreateTodo'
import { createWrapper } from '../methods'


describe('Test CreateTodo', () => {

  let wrapper
  beforeEach(() => {
    wrapper = createWrapper(CreateTodo)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Push route', async () => {
    const link = wrapper.find('.link-test')
    await link.trigger('click')
    expect(wrapper.vm.$route.name).toBe('Dogs')
  })
})