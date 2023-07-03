import { Button } from '@fuel-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './nftDetails.css';
// import { NFTAbi__factory } from '../../../../../../contracts/nft';

import { Layout, Pages } from '~/systems/Core';

// import { FetchMachine, WalletLockedCustom } from '~/systems/Core';
// import { NetworkService } from '~/systems/Network';
// import { TxInputs, TxService } from '~/systems/Transaction/services';
// import { AccountService } from '~/systems/Account';

const AttrCard = (props: { attrName: string; attrValue: string }) => {
  return (
    <div style={style.attrCard}>
      <span style={style.textMuted}>{props.attrName}</span>
      <h5 className="mt-3">{props.attrValue}</h5>
    </div>
  );
};

const style = {
  img: {
    width: '100%',
  },
  attrCard: {
    border: '1px solid rgba(138, 138, 160, 0.3)',
    borderRadius: '10px',
    padding: '10px',
  },
  textMuted: {
    color: 'rgb(255, 255, 255, 0.75)',
    textTransform: 'uppercase !important',
  },
  attributes: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px 10px',
  },
};

export function NFTDetails() {
  const [nft, setNft] = useState({
    name: '',
    image: '',
    description: '',
    attributes: [],
  });
  const [currentScreen, setCurrentScreen] = useState<any>({
    screenName: 'screen1',
    props: nft,
  });
  const navigate = useNavigate();
  const { contractId, token } = useParams();

  const screens = {
    screen1: (nft: any) => (
      <div className="screen1">
        <Layout.TopBar onBack={() => navigate(Pages.nfts())} />
        <Layout.Content>
          {nft ? (
            <div>
              {nftData(nft.name, nft.image)}
              <div className="doubleButton">
                <Button
                  aria-label="Assets"
                  intent="primary"
                  onPress={() =>
                    setCurrentScreen({
                      screenName: 'screen2',
                      props: nft,
                    })
                  }
                >
                  Send
                </Button>
                <Button
                  aria-label="Assets"
                  intent="primary"
                  onPress={() =>
                    setCurrentScreen({
                      screenName: 'list',
                      props: nft,
                    })
                  }
                >
                  List
                </Button>
              </div>

              <h4>Description</h4>
              <h4>{nft.description}</h4>
              <h4>Attributes</h4>
              <div style={style.attributes}>
                wallet
                {nft.attributes.length ? (
                  nft.attributes.map((attr) => (
                    <AttrCard
                      key={attr.trait_type}
                      attrName={attr.trait_type}
                      attrValue={attr.value}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </Layout.Content>
        <Layout.BottomBar>
          <Button
            aria-label="Assets"
            variant="ghost"
            onPress={() => navigate(Pages.wallet())}
          >
            Assets
          </Button>
          <Button
            aria-label="NFTs"
            intent="primary"
            onPress={() => navigate(Pages.nfts())}
          >
            NFTs
          </Button>
        </Layout.BottomBar>
      </div>
    ),
    screen2: (nft: any) => (
      <>
        <Layout.TopBar onBack={() => navigate(Pages.nfts())} />
        <Layout.Content>
          <div>{nftData(nft.name, nft.image)}</div>
          <div>
            <input className="input" type="text" />
          </div>
        </Layout.Content>
        <Layout.BottomBar>
          <Button
            aria-label="Assets"
            // intent="primary"
            onPress={() =>
              setCurrentScreen({ screenName: 'screen1', props: nft })
            }
          >
            Cancel
          </Button>
          <Button
            aria-label="NFTs"
            variant="ghost"
            onPress={() =>
              setCurrentScreen({ screenName: 'screen3', props: nft })
            }
          >
            Next
          </Button>
        </Layout.BottomBar>
      </>
    ),
    screen3: (props: any) => (
      <div className="screen3">
        <Layout.TopBar onBack={() => navigate(Pages.nfts())} />
        <Layout.Content>
          <div className="top">
            <h2 className="colorWhite">Confirm Send</h2>
            <img
              src={props.image}
              alt={props.name}
              height={100}
              width={100}
              className="borderImage"
            />
            <h1 className="colorWhite">{props.name}</h1>
            <p>to Wallet 1 (8hkSe...eT3Yb)</p>
            <div className="paymentDetails">
              <ul>
                <li>
                  <span>To</span>
                  <span className="colorWhite">Wallet 1 (8hkSe...eT3Yb)</span>
                </li>
                <li>
                  <span>Network</span>
                  <span className="colorWhite">Solana</span>
                </li>
                <li>
                  <span>Network fee</span>
                  <span className="colorWhite">$0.0001</span>
                </li>
              </ul>
            </div>
          </div>
        </Layout.Content>
        <Layout.BottomBar>
          <Button
            aria-label="Assets"
            // intent="primary"
            onPress={() => {
              setCurrentScreen({
                screenName: 'screen2',
                props: nft,
              });
            }}
          >
            Cancel
          </Button>
          <Button aria-label="NFTs" variant="ghost" onPress={() => {}}>
            Send
          </Button>
        </Layout.BottomBar>
      </div>
    ),
    list: (props: any) => (
      <div className="list">
        <Layout.TopBar onBack={() => navigate(Pages.nfts())} />
        <Layout.Content>
          <div>
            <h2>List on Fuelart</h2>
            <label className="mb16 dBlock" htmlFor="amount">
              List Price
            </label>
            <input
              type="number"
              id="amount"
              className="input mb16"
              placeholder="Amount"
            />
            <div className="listBottom">
              <div className="dFlex justifyBetween p14 borderBottom">
                <div className="textCapitalize">
                  <p className="colorWhite">{props.name} #95</p>
                  <p>{props.name}</p>
                </div>
                <img
                  className="borderImage"
                  src={props.image}
                  alt={props.name}
                  height={75}
                  width={75}
                />
              </div>
              <div className="dFlex justifyBetween p14 borderBottom">
                <span>Floor Price</span>
                <span className="colorWhite">0.04 SOL</span>
              </div>
              <div className="dFlex justifyBetween p14 borderBottom">
                <span>Original Purchase Price</span>
                <span className="colorWhite">1.04 SOL</span>
              </div>
            </div>
          </div>
        </Layout.Content>
        <Layout.BottomBar>
          <Button
            aria-label="Assets"
            // intent="primary"
            onPress={() => {
              setCurrentScreen({
                screenName: 'screen2',
                props: nft,
              });
            }}
          >
            Cancel
          </Button>
          <Button aria-label="NFTs" variant="ghost" onPress={() => {}}>
            Next
          </Button>
        </Layout.BottomBar>
      </div>
    ),
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetch(
        `https://fuel-nft-apis.vercel.app/nft/${contractId?.slice(2)}/${token}`
      );
      const result = await data.json();

      setNft(result.nft_data);
      setCurrentScreen({ screenName: 'screen1', props: result.nft_data });
      console.log(result);
    };

    loadData();
  }, []);

  const nftData = (name: string, image: string) => {
    return (
      <div>
        <h2>{name}</h2>
        <img style={style.img} src={image} alt="" />
      </div>
    );
  };

  // const next = async () => {
  //   console.log('transfer clicked');
  //   const [network, account] = await Promise.all([
  //     NetworkService.getSelectedNetwork(),
  //     AccountService.getCurrentAccount(),
  //   ]);
  //   // if (!to || !network?.url || !account) {
  //   if (!network?.url || !account) {
  //     throw new Error('Missing params for transaction request');
  //   }
  //   const wallet = new WalletLockedCustom(account.address, network.url);
  //   console.log(wallet.address.toB256());

  //   const NFTContract = NFTAbi__factory.connect(contractId, wallet);
  //   const transfer_from = await NFTContract.functions
  //     .transfer_from(
  //       { Address: { value: wallet.address.toB256() } },
  //       { ContractId: { value: contractId } },
  //       token
  //     )
  //     .txParams({ gasPrice: 50 })
  //     .call();
  //   console.log('transfer_from', transfer_from);
  // };

  return (
    <Layout title="Nft Details">
      <div className="nftDetails">
        {screens[currentScreen.screenName](currentScreen.props)}
      </div>
    </Layout>
  );
}
