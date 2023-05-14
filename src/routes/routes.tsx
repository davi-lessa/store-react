import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AnimatedRoutes from 'components/AnimatedRoutes'

import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import ThirdPartyPasswordless from 'supertokens-auth-react/recipe/thirdpartypasswordless'
import Session from 'supertokens-auth-react/recipe/session'

import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui'
import { ThirdPartyPasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui'
import * as reactRouterDom from 'react-router-dom'

SuperTokens.init({
  appInfo: {
    appName: 'MinoxHero',
    apiDomain: 'https://tests.gdsv.workers.dev',
    websiteDomain: 'http://localhost:5173',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    ThirdPartyPasswordless.init({
      contactMethod: 'EMAIL',
      signInUpFeature: {
        providers: [
          ThirdPartyPasswordless.Github.init(),
          ThirdPartyPasswordless.Google.init(),
          ThirdPartyPasswordless.Facebook.init(),
          ThirdPartyPasswordless.Apple.init(),
        ],
      },
    }),
    Session.init(),
  ],
})

export default function AppRouter() {
  return (
    <SuperTokensWrapper>
      <Router>
        <AnimatePresence>
          <AnimatedRoutes></AnimatedRoutes>
        </AnimatePresence>
        <Routes>{getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPasswordlessPreBuiltUI])}</Routes>
      </Router>
    </SuperTokensWrapper>
  )
}
