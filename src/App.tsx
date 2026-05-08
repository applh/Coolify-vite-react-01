/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

// Standard pages, lazy loaded for performance
const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const About = lazy(() => import("./pages/About").then(module => ({ default: module.About })));
const Services = lazy(() => import("./pages/Services").then(module => ({ default: module.Services })));
const Pricing = lazy(() => import("./pages/Pricing").then(module => ({ default: module.Pricing })));
const FAQ = lazy(() => import("./pages/FAQ").then(module => ({ default: module.FAQ })));
const Blog = lazy(() => import("./pages/Blog").then(module => ({ default: module.Blog })));
const Contact = lazy(() => import("./pages/Contact").then(module => ({ default: module.Contact })));

// Legal pages, lazy loaded for performance
const Privacy = lazy(() => import("./pages/Privacy").then(module => ({ default: module.Privacy })));
const Terms = lazy(() => import("./pages/Terms").then(module => ({ default: module.Terms })));
const Legal = lazy(() => import("./pages/Legal").then(module => ({ default: module.Legal })));

function LazyFallback() {
  return (
    <div className="flex-1 flex items-center justify-center p-24">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<LazyFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="legal" element={<Legal />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

