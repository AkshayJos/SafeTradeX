import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { CrossIcon, DotIcon, MessageCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoinList,
  getTop50CoinList,
  getTrendingCoin,
  resetCoinState,
} from "../../State/Coin/Action";
import { useSearch } from "../../context/SearchContext";
import toast from "react-hot-toast";
import { Loader } from "../../components/ui/loader";
import { formatDecimalWithEllipsis } from "../../utils/formatDecimalWithEllipsis";

const Home = () => {
  const [category, setCategory] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [isBotRelease, setIsBotRelease] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showChart, setShowChart] = useState(false);

  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);

  const [filteredCoins, setFilteredCoins] = useState(coin);
  const { searchQuery, setSearchQuery, setTriggerSearch, triggerSearch, setSearchInput } = useSearch();

  console.log(coin)

  const getCoinListData = () => {
    if (category === "all") {
      dispatch(getCoinList(currentPage));
    } else if (category === "top50") {
      dispatch(getTop50CoinList());
    } else if (category === "trending") {
      dispatch(getTrendingCoin());
    } else if (coin.error) {
      toast.error(coin.error);
    }
  };

  useEffect(() => {
    getCoinListData();
    setSearchInput("");
    setSearchQuery("");
    setTriggerSearch(false);
  }, [category, currentPage]);

  useEffect(() => {
     let selectedCoins;
   const hello = () => {
      switch (category) {
        case "all":
          selectedCoins = filteredCoins.coinList;
          break;
        case "top50":
          selectedCoins = filteredCoins.top50;
          break;
        case "trending":
          selectedCoins = filteredCoins.trendingCoinList;
          break;
        default:
          selectedCoins = [];
      }
    };

    hello();

    if (coin.error && selectedCoins.length == 0) {
      toast.error(coin.error);

        getCoinListData();

    }
  }, [coin.error]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCoins(coin); // full reset
    } else {
      const q = searchQuery.toLowerCase();
      const filteredList = coin.coinList.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.symbol.toLowerCase().includes(q)
      );

      setFilteredCoins({
        ...coin, // keep other properties intact
        coinList: filteredList, // update only coinList
      });
    }

    setShowChart(true);
  }, [triggerSearch, searchQuery, coin]);

  const handleBotRelease = () => {
    setIsBotRelease(!isBotRelease);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setSearchInput("");
    setSearchQuery("");
    setTriggerSearch(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(inputValue);
    }
    setInputValue("");
  };

  return coin.loading ? (
    <Loader />
  ) : (
    <div className="relative mx-4">
      <div className="lg:flex">
        <div className="lg:w-[50%] lg-border-r">
          <div className="p-3 flex items-center gap-4">
            <Button
              onClick={() => handleCategory("all")}
              variant={category === "all" ? "default" : "outline"}
              className={` rounded-full cursor-pointer
                        ${
                          category === "all"
                            ? "ring-2 ring-violet-500 border-violet-500"
                            : ""
                        }
                    `}
            >
              All
            </Button>

            <Button
              onClick={() => handleCategory("top50")}
              variant={category === "top50" ? "default" : "outline"}
              className={` rounded-full cursor-pointer
                    ${
                      category === "top50"
                        ? "ring-2 ring-violet-500 border-violet-500"
                        : ""
                    }
                `}
            >
              Top 50
            </Button>

            <Button
              onClick={() => handleCategory("trending")}
              variant={category === "trending" ? "default" : "outline"}
              className={` rounded-full cursor-pointer ${
                category === "trending"
                  ? "ring-2 ring-violet-500 border-violet-500"
                  : ""
              }
                `}
            >
              Trending
            </Button>

            <Button
              onClick={() => handleCategory("topGainers")}
              variant={category === "topGainers" ? "default" : "outline"}
              className={`rounded-full cursor-pointer ${
                category === "topGainers"
                  ? "ring-2 ring-violet-500 border-violet-500"
                  : ""
              }
                `}
            >
              Top Gainers
            </Button>

            <Button
              onClick={() => handleCategory("topLosers")}
              variant={category === "topLosers" ? "default" : "outline"}
              className={` rounded-full cursor-pointer ${
                category === "topLosers"
                  ? "ring-2 ring-violet-500 border-violet-500"
                  : ""
              }
                `}
            >
              Top Losers
            </Button>
          </div>
          {filteredCoins.top50 &&
            (() => {
              let selectedCoins;

              switch (category) {
                case "all":
                  selectedCoins = filteredCoins.coinList;
                  break;
                case "top50":
                  selectedCoins = filteredCoins.top50;
                  break;
                case "trending":
                  selectedCoins = filteredCoins.trendingCoinList;
                  break;
                default:
                  selectedCoins = [];
              }

              return <AssetTable coin={selectedCoins} category={category} />;
            })()}

          <div className="cursor-pointer">
            {category === "all" &&
              (() => {
                const pageGroup = Math.floor((currentPage - 1) / 10);
                const startPage = pageGroup * 10 + 1;
                const endPage = startPage + 9;

                return (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))
                          }
                        />
                      </PaginationItem>

                      {[...Array(10)].map((_, idx) => {
                        const page = startPage + idx;
                        const isActive = currentPage === page;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={isActive}
                              onClick={() => setCurrentPage(page)}
                              className={
                                isActive
                                  ? "border-3 border-violet-300 rounded-md"
                                  : ""
                              }
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage(currentPage + 1)}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                );
              })()}
          </div>
        </div>

        <div className="hidden lg:block lg:w-[50%] p-5">
          {showChart &&
            (() => {
              let selectedCoins;

              switch (category) {
                case "all":
                  selectedCoins = filteredCoins.coinList;
                  break;
                case "top50":
                  selectedCoins = filteredCoins.top50;
                  break;
                case "trending":
                  selectedCoins = filteredCoins.trendingCoinList;
                  break;
                default:
                  selectedCoins = [];
              }

              return (
                selectedCoins &&
                selectedCoins.length > 0 && (
                  <>
                    <StockChart
                      coinId={selectedCoins[0]?.id || selectedCoins[0]?.item.id}
                    />
                    <div className="flex gap-5 items-center mt-4">
                      <div className="w-12">
                        <Avatar>
                          <AvatarImage
                            src={
                              selectedCoins[0]?.image ||
                              selectedCoins[0]?.item.large
                            }
                          />
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex item-cneter gap-2">
                          <p>
                            {selectedCoins[0]?.symbol?.toUpperCase() ||
                              selectedCoins[0]?.item.symbol}
                          </p>
                          <DotIcon className="text-gray-400" />
                          <p className="text-gray-400">
                            {selectedCoins[0]?.name ||
                              selectedCoins[0]?.item.name}
                          </p>
                        </div>
                        <div className="flex items-end gap-2">
                          <p className="text-xl font-bold">
                            {formatDecimalWithEllipsis(
                              selectedCoins[0]?.current_price ||
                                selectedCoins[0]?.item.data.price
                            )}
                          </p>
                          <p
                            className={`${
                              selectedCoins[0]?.market_cap_change_24h ||
                              selectedCoins[0]?.item.data.market_cap_btc > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span>
                              {selectedCoins[0]?.market_cap_change_24h ||
                                selectedCoins[0]?.item.data.market_cap_btc}$
                            </span>
                            <span>
                              {" "}
                              (
                              {formatDecimalWithEllipsis(
                                selectedCoins[0]
                                  ?.market_cap_change_percentage_24h ||
                                  selectedCoins[0]?.item.data
                                    .price_change_percentage_24h.usd
                              )}
                              %)
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )
              );
            })()}

          {/* {showChart && <StockChart coinId="bitcoin" />} */}
        </div>
      </div>


       {/* chat bot section */}
      {/* <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        {isBotRelease && (
          <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-violet-950 opacity-85">
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p>Chat Bot</p>
              <Button onClick={handleBotRelease} variant="ghost" size="icon">
                <CrossIcon />
              </Button>
            </div>

            <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">
              <div className="self-start pb-5 w-auto">
                <div className="justify-end self-end px-5 py-2 rounded-md bg-violet-900 w-auto">
                  <p>Hii, Ram Arora</p>
                  <p>You can ask crypto related any qustions</p>
                  <p>like, price, market cap extra...</p>
                </div>
              </div>

              {[1, 1, 1, 1, 1, 1].map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index % 2 == 0 ? "self-start" : "self-end"
                  } "pb-5 w-auto"`}
                >
                  {item % 2 == 0 ? (
                    <div className="justify-end self-en d px-5 py-2 rounded-md bg-violet-900 w-auto">
                      <p>prompt who are you?</p>
                    </div>
                  ) : (
                    <div className="justify-end self-end px-5 py-2 rounded-md bg-violet-900 w-auto">
                      <p>ans hii, Ram Arora!</p>
                    </div>
                  )}
                </div>
              ))}

              <div className="h-[12%] border-t">
                <Input
                  className="w-full h-full order-none outline-none"
                  placeholder="write prompt"
                  onChange={handleChange}
                  value={inputValue}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          </div>
        )}

        <div className="relative w-[10rem] cursor-pointer group">
          <Button
            onClick={handleBotRelease}
            className="w-[7.5rem] h-[2.5rem] gap-2 items-center"
          >
            <MessageCircle
              size={30}
              className="fill-[#2b026e] -rotate-90 stroke-none group-hover:fill-[#2b026e]"
            />
            <span className="text-lg">Chat Bot</span>
          </Button>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
