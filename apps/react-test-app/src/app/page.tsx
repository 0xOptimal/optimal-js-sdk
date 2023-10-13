"use client";

import { useState, type ReactNode } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { toast } from "react-hot-toast";

import { OptimalAd, OptimalProvider } from "@getoptimal/react";

function Card({
  title,
  className,
  children,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-white shadow-lg rounded-lg overflow-hidden",
        className,
      )}
    >
      <div className="py-4 px-8  bg-slate-50 shadow">
        <h2 className="text-2xl">{title}</h2>
      </div>
      <div className="p-8 overflow-auto">{children}</div>
    </div>
  );
}

export default function Page() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <main className="container mx-auto py-8 px-6 min-h-screen flex gap-6 flex-col">
      <OptimalProvider>
        <h1 className="text-4xl font-bold">Optimal Ethical Ads Demo</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Card title="Always On" className="flex-1">
              <div className="rounded-lg border-2 flex justify-center items-cente p-4 border-green-100">
                <OptimalAd
                  opts={{
                    publisher: "test-publisher",
                    adTypes: ["sq-img-text-box"],
                    viewerData: {
                      wallets: [
                        "1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                        "1:0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
                      ],
                    },
                  }}
                  renderLoading={() => <div>Loading...</div>}
                  onViewStart={() => {
                    toast("Always on ad view start");
                  }}
                  onViewEnd={() => {
                    toast("Always on ad view ended");
                  }}
                />
              </div>
            </Card>
            <Card title="Dynamic Visibility" className="flex-1">
              <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className="gap-4 flex flew-row">
                  <Tab className="bg-blue-500 px-6 py-2 rounded text-white flex-1">
                    Default
                  </Tab>
                  <Tab className="bg-blue-500 px-6 py-2 rounded text-white flex-1">
                    Ad Test
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-4 min-h-[150px] flex justify-center items-center">
                  <Tab.Panel>Go to other tab</Tab.Panel>
                  <Tab.Panel>
                    <OptimalAd
                      opts={{
                        publisher: "test-publisher",
                        adTypes: ["sq-img-text-box"],
                        viewerData: {
                          wallets: [
                            "1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                            "1:0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
                          ],
                        },
                      }}
                      renderLoading={() => <div>Loading...</div>}
                      onViewStart={() => {
                        toast("Dynamic view ad view start");
                      }}
                      onViewEnd={() => {
                        toast("Dynamic view ad view ended");
                      }}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </Card>
          </div>

          <Card title="Scroll">
            <div className="flex flex-col gap-4 h-[50vh]">
              <div className="min-h-[400px] rounded-lg border-2 border-slate-100">
                Placeholder
              </div>
              <div className="min-h-[400px] rounded-lg border-2 border-slate-100">
                Placeholder
              </div>
              <div className="rounded-lg border-2 flex justify-center items-cente p-4 border-green-100">
                <OptimalAd
                  opts={{
                    publisher: "test-publisher",
                    adTypes: ["sq-img-text-box"],
                    viewerData: {
                      wallets: [
                        "1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                        "1:0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
                      ],
                    },
                  }}
                  renderLoading={() => <div>Loading...</div>}
                  onViewStart={() => {
                    toast("Scroll ad view start");
                  }}
                  onViewEnd={() => {
                    toast("Scroll ad view ended");
                  }}
                />
              </div>
              <div className="min-h-[400px] rounded-lg border-2 border-slate-100">
                Placeholder
              </div>
            </div>
          </Card>
        </div>
      </OptimalProvider>
    </main>
  );
}
