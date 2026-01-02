import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { departments } from "@/constants/departments";
import { UserProfile } from "@/types/user";
import { mockUsers } from "@/mocks/mockUsers";

export default function SearchMate() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Footer />
    </div>
  );
}
