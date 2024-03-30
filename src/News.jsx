import React, { useState } from "react";
import "./News.css";

function News() {
  const [news, setNews] = useState({
    data: [
      {
        url: "https://www.coindesk.com/policy/2024/03/29/custodia-bank-loses-lawsuit-challenging-fed-rejection-of-master-account-application/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title:
          "Custodia Bank Loses Lawsuit Challenging Fed Rejection of Master Account Application",
        description:
          "A federal judge ruled that Custodia Bank, a Wyoming special-purpose depository institution, isn't entitled to membership in the Federal Reserve or to a Fed master account.",
        thumbnail:
          "https://www.coindesk.com/resizer/b3UN-XHshBCZ18IedeTsPZTScPk=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/UMY5YF5PLJETBB2Q7SKIYHSOPY.jpg",
        createdAt: "Fri, 29 Mar 2024 21:58:48 +0000",
      },
      {
        url: "https://www.coindesk.com/policy/2024/03/29/binance-executives-file-suit-against-nigeria-local-media/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title: "Binance Executives File Suit Against Nigeria: Local Media",
        description:
          "The two Binance executives held in Nigeria after being invited for consultations filed suit against two government agencies for allegedly violating their human rights.",
        thumbnail:
          "https://www.coindesk.com/resizer/F22R0nWy7Rtly6ErWYkX4UjcAbM=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/TI45YDT45RHE3CKGYGJT2I6YRQ.JPG",
        createdAt: "Fri, 29 Mar 2024 15:01:21 +0000",
      },
      {
        url: "https://www.coindesk.com/tech/2024/03/29/solana-foundation-says-it-can-filter-through-the-offensive-meme-coin-problem/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title:
          "Solana Foundation Says It Can Filter Through the Offensive Meme Coin Problem",
        description:
          "Panelists at a BUIDL Asia summit said racist meme coins can be handled with a light touch.",
        thumbnail:
          "https://www.coindesk.com/resizer/IKxBdF83R46MeYwfVNZc9ceQSFM=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/2NRF5LIH5JBZ7INJQKCU7WLYAA.jpg",
        createdAt: "Fri, 29 Mar 2024 12:43:58 +0000",
      },
      {
        url: "https://www.coindesk.com/policy/2024/03/29/uk-judge-freezes-craig-wright-assets-to-prevent-him-evading-court-costs/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title:
          "Craig Wright Assets Frozen by UK Judge to Prevent Him Evading Court Costs",
        description:
          "Judge James Mellor found earlier this month that Wright was not, as he'd claimed, Bitcoin inventor Satoshi Nakomoto",
        thumbnail:
          "https://www.coindesk.com/resizer/ScxSy7XnxT2VlRXMKkCxw16iU10=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/AO52LLBESNF7JL2UJOBHMYVDOE.jpg",
        createdAt: "Fri, 29 Mar 2024 11:35:22 +0000",
      },
      {
        url: "https://www.coindesk.com/policy/2024/03/29/sbf-is-going-to-prison-for-25-years/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title: "SBF Is Going to Prison for 25 Years",
        description:
          "Sam Bankman-Fried is going to prison. He won't be spending time in a maximum security facility, and he'll be placed as close to his family in the San Francisco Bay Area as possible, but he's going to prison nonetheless – and he'll be there for the next 25 years.",
        thumbnail:
          "https://www.coindesk.com/resizer/MBozpp2NOIgZNUOQ8VYT2nLbtCE=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/2KZ3MJ77YNDCFD7LH2VTWDHJRY.png",
        createdAt: "Fri, 29 Mar 2024 10:00:00 +0000",
      },
      {
        url: "https://www.coindesk.com/markets/2024/03/29/dogwifhat-becomes-third-largest-meme-coin-as-bitcoin-clings-to-70k/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title:
          "Dogwifhat Becomes Third-Largest Meme Coin as Bitcoin Clings to $70K",
        description:
          "WIF touched the $4 mark early Friday before retreating as the meme coin sector showed the most volatility in a little-changed market.",
        thumbnail:
          "https://www.coindesk.com/resizer/ODONEQwfDoGwG8F5tLpG9_DPSE4=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/AHRVBRW5B5F4FK7AHW32U2FGVY.jpg",
        createdAt: "Fri, 29 Mar 2024 08:51:33 +0000",
      },
      {
        url: "https://www.coindesk.com/tech/2024/03/29/call-of-duty-cheaters-allegedly-lose-their-bitcoin-as-hackers-target-gamers-with-malware/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title:
          "Call of Duty Cheaters Allegedly Lose Their Bitcoin as Hackers Target Gamers With Malware",
        description:
          "The malware has already impacted hundreds of thousands of players and the numbers are still growing, as per malware market informer @vxunderground.",
        thumbnail:
          "https://www.coindesk.com/resizer/Ya5UXEe3xRIrzPHZXjZmJBvp5UA=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/SJWTFJUZTFEQ7JGXEQI5OE6WEU.jpg",
        createdAt: "Fri, 29 Mar 2024 06:40:19 +0000",
      },
      {
        url: "https://www.coindesk.com/markets/2024/03/29/ethenas-prelaunch-futures-surge-22-as-ena-token-is-set-to-go-live-next-week/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title:
          "Ethena’s Prelaunch Futures Surge 22% as ENA Token Is Set to Go Live Next Week",
        description:
          "The price surge implied that the token could debut with a market cap of over $500 million.",
        thumbnail:
          "https://www.coindesk.com/resizer/smq18tNv3UHzZGtDfi39d8E3Bx0=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/T6YOCUY54ZBAHBGTHBS3EJC24U.jpg",
        createdAt: "Fri, 29 Mar 2024 06:32:30 +0000",
      },

      {
        url: "https://www.coindesk.com/consensus-magazine/2024/03/28/is-this-the-end-of-bitcoins-4-year-bullbear-market-cycle/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        title: "Is This the End of Bitcoin's 4-Year Bull/Bear Market Cycle?",
        description: "",
        thumbnail:
          "https://www.coindesk.com/resizer/EkH3yLBamkQbVIT1pV5GJI1OJAQ=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/5HK2YAN7J5H33GIN32LVKI7S4Y.jpg",
        createdAt: "Thu, 28 Mar 2024 19:21:58 +0000",
      },
    ],
  });

  //   async function fetchNews() {
  //     const url = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key": "1850cce7b9msh64fe205656824b2p1e745djsnb0f66d7b979f",
  //         "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       console.log(result);
  //       setNews(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchNews();

  return (
    <div className="news">
      <h1>Latest Crypto News</h1>
      <div className="cards">
        {news &&
          news.data.map((item, index) => (
            <div key={index} className="card">
              <a href={item.url} target="_blank">
                <img src={item.thumbnail} alt="" className="news-img" />
                <div className="text">
                  <h3 className="news-desc">{item.title}</h3>
                  {/* <p className="desc">{item.description}</p> */}
                  <p className="date">{item.createdAt.substring(0, 16)}</p>
                </div>
              </a>
            </div>
          ))}
      </div>

      {/* <button>See More</button> */}
    </div>
  );
}

export default News;
