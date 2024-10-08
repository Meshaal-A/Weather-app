"use client";
import React from "react";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Command as CommandIcon } from "lucide-react";

// Define the type for items in geoCodedList
interface GeoCodedItem {
  country: string;
  state?: string; // Optional if state can be undefined
  name: string;
  lat: number;
  lon: number;
}

function SearchDialog() {
  // Assuming geoCodedList and inputValue are coming from your global context
  const {
    geoCodedList = [],
    inputValue = "",
    handleInput,
  } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
          >
            <p className="text-sm text-muted-foreground">Search Here...</p>
            <div className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              <CommandIcon className="w-4 h-4" />
              <span className="text-[9px]">F</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput} // Correctly using onChange for input handling
              placeholder="Type a command or search..."
            />
            <CommandList>
              <ul className="px-3 pb-2">
                <p className="p-2 text-sm text-muted-foreground">Suggestions</p>
                {geoCodedList.length === 0 ? (
                  <p>No Results</p>
                ) : (
                  geoCodedList.map((item: GeoCodedItem, index: number) => {
                    const { country, state, name, lat, lon } = item;
                    return (
                      <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm rounded-sm cursor-default 
                          ${hoveredIndex === index ? "bg-accent" : ""}`}
                        onClick={() => getClickedCoords(lat, lon)}
                      >
                        <p className="text">
                          {name}, {state && `${state},`} {country}
                        </p>
                      </li>
                    );
                  })
                )}
              </ul>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;
