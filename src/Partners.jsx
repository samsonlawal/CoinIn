import "./Partners.css";
import Binance from "./img/binance-logo.svg";
import Coinbase from "./img/coinbase.svg";
import Okx from "./img/okx.svg";
import kucoin from "./img/kucoin.png";

function Partners() {
  return (
    <div className="partners">
      {/* <h3 className="partner-header">OUR PARTNERS</h3> */}
      <div className="logos">
        <section>
          <img className="binance" src={Binance} />
        </section>

        <section>
          <img className="coinbase" src={Coinbase} />
        </section>

        <section>
          <img className="binance" src={Okx} />
        </section>

        <section>
          <img className="coinbase" src={kucoin} />
        </section>

        <section>
          <img className="binance" src={Binance} />
        </section>
      </div>
    </div>
  );
}

export default Partners;
