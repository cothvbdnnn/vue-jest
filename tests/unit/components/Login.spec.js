import { createWrapper } from "../methods";
import Login from '@/components/Login.vue'
import mockAxios from 'axios'
import Cookie from 'js-cookie'

let wrapper
beforeEach(() => {
  wrapper = createWrapper(Login)
})

afterEach(() => {
  wrapper.destroy()
})

describe('Login', () => {
  it('should login when submit', async () => {
    const dataResolve = {
      data: {
        email: 'test@gmail.com',
        auth_token: 'test_token'
      }
    }
    mockAxios.post = jest.fn(() => Promise.resolve(dataResolve))
    const storageSetItem = jest.spyOn(Storage.prototype, 'setItem')
    const cookieSet = Cookie.set = jest.fn()

    const formLogin = {
      email: "test@gmail.com",
      password: "123456",
    }
    wrapper.setData({
      formLogin
    })
    const btnSubmit = wrapper.find('.submit')
    await btnSubmit.trigger('click')    

    const postApi = await mockAxios.post
    expect(postApi).toHaveBeenCalledWith(
      "auth/signin", 
      {
        "email": formLogin.email, 
        "password": formLogin.password
      }
    )
    expect(storageSetItem).toHaveBeenCalledWith("userEmail", dataResolve.data.email)
    expect(cookieSet).toHaveBeenCalledWith("auth_token", dataResolve.data.auth_token)
    expect(wrapper.vm.loading).toBe(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$route.path).toBe('/api/list')
  });
});