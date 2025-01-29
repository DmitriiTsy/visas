"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import LeadForm from "../components/LeadForm";
import Header from "../components/Header";
import { store } from "../store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8">
          <LeadForm />
        </div>
        <Toaster position="top-right" />
      </div>
    </Provider>
  );
}
