"use client";
import GetStarted from "@/components/GetStarted";
import Navbar from "@/components/Navbar";
import QueryBuilder from "@/components/QueryBuilder";
import { Result } from "@/lib/types";
import React, { useState } from "react";

export default function Home() {
  const [queryData, setQueryData] = useState<Result | null>(null);

  return (
    <React.Fragment>
      <Navbar setQueryData={setQueryData} />
      <main className="flex justify-center">
        {queryData == null ? (
          <GetStarted setQueryData={setQueryData} />
        ) : (
          <QueryBuilder queryData={queryData} setQueryData={setQueryData} />
        )}
      </main>
    </React.Fragment>
  );
}
