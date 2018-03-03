import React from 'react'

const LoginForm = (props) => (
  <div>
    <h2>Log in to application</h2>

   <form onSubmit={props.login}>
     <div>
       username
       <input
         type="text"
         name="username"
         value={props.username}
         onChange={props.handleChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
          value={props.password}
          onChange={props.handleChange}
         />
       </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm
