import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import PageModel from 'components/DefaultPage'
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
import Account from 'pages/Account'
import ProductPage from 'pages/Product'

import * as SuperTokens from 'supertokens-auth-react'
import * as ThirdPartyPasswordless from 'supertokens-auth-react/recipe/thirdpartypasswordless'
import * as Session from 'supertokens-auth-react/recipe/session'
import * as STR from 'supertokens-auth-react/ui'
import * as STUI from 'supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui'
import * as reactRouterDom from 'react-router-dom'

SuperTokens.init({
  appInfo: {
    appName: 'MinoxHero',
    apiDomain: 'https://f5gl9zxk27.execute-api.sa-east-1.amazonaws.com',
    websiteDomain: 'https://store-react.pages.dev/',
    apiBasePath: '/prod/auth',
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

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  return (
    <SuperTokens.SuperTokensWrapper>
      <Routes location={location}>
        {STR.getSuperTokensRoutesForReactRouterDom(reactRouterDom, [STUI.ThirdPartyPasswordlessPreBuiltUI])}
        <Route path="/" element={<PageModel />}>
          <Route index element={<Home />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="product/:slug?" element={<ProductPage />}></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </SuperTokens.SuperTokensWrapper>
  )
}

export default AnimatedRoutes
