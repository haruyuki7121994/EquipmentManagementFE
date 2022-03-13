import React, { Component } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { authReducer } from './redux/reducers/authReducer'
import CookieService from './services/CookieService'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Reset = React.lazy(() => import('./views/pages/password/Reset'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Logout = React.lazy(() => import('./views/pages/logout/Logout'))
const VerifyPassword = React.lazy(() => import('./views/pages/password/NewPassword'))

class App extends Component {
  constructor(props) {
    super(props)
    // khởi tạo giá trị state
    const access_token = CookieService.get('access_token')
    this.state = { isLogin: access_token !== undefined, access_token: access_token }
  }
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    setAuth: PropTypes.func.isRequired,
  }
  render() {
    console.log(this.state.isLogin)
    if (this.state.isLogin) {
      this.props.setAuth(true, this.state.access_token)
    }
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route exact path="/reset" name="Reset Page" render={(props) => <Reset {...props} />} />
            <Route
              exact
              path="/verify"
              name="Verify Page"
              render={(props) => <VerifyPassword {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/logout"
              name="Logout Page"
              render={(props) => <Logout {...props} />}
            />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            {this.state.isLogin || this.props.isLogin ? (
              <>
                <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
              </>
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                }}
              />
            )}
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}
function mapStateToProps(state) {
  return {
    isLogin: state.auth.isLogin,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setAuth: (isLogin, token) =>
      dispatch(
        authReducer.actions.setAuth({
          isLogin: isLogin,
          data: { token: token },
        }),
      ),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
