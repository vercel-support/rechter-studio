import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from '../shared';
// import { Navigation } from '../components';
import { wrapper } from '../store/store';
import reactor from '../reactor-utils';
import { helmet, device } from '../store';
import { GA } from '../services';
import styles from './styles.scss';
import Footer from '../components/footer/footer';
import './fonts.scss';

reactor.init();

const getCMSData = async (dispatch) => {
  try {
    // const navigationCMS = await reactor.getPage('BYnmRg3UKC2LKLyLPfB5');
    // const contactCMS = await reactor.getPage('pVIXGZJstHCcy5y9lShf');
    // const footerCMS = await reactor.getPage('iBnQ41ARhlS6B8AKdhq0');
    // const careersCMS = await reactor.getCollection('SPnuhAaBCntNyJA8XDOc');
    // const careersPageCMS = await reactor.getPage('BUoy6VHdASP7S8FNYNE2');
    // dispatch(cms.actions.storeNavigationData(navigationCMS));
    // dispatch(cms.actions.storeContactnData(contactCMS));
    // dispatch(cms.actions.storeFooterData(footerCMS));
    // dispatch(cms.actions.storeCareersData(careersCMS));
    // dispatch(cms.actions.storeCareersPageData(careersPageCMS));
  } catch (err) {
    console.error('failed to connect to reactor!: ', err);
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#00E3EB'
    }
  },
  ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
  fontFamily: 'ubuntu',
  btnText: {
    textTransform: 'none',
    fontSize: 19
  }
});

class MyApp extends App {
  constructor(props) {
    super(props);
    GA.init('UA-171800556-1');
  }

  render() {
    const { Component, pageProps, helmet, router } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Helmet
          title={helmet.tabTitle}
          description={helmet.metaDescription}
          imageForSocial='/images/logo-social-square.png'
        />
        <div>
          {/* <Navigation /> */}
          {/* <Video /> */}
          <div className={styles.stage}>
            <AnimatePresence>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  console.log('get initial props');
  await getCMSData(ctx.store.dispatch);
  if (ctx.req) {
    // mimic device on server
    ctx.store.dispatch(device.actions.ssr(ctx.req.headers['user-agent']));
  }
  return {};
};

const mapStateToProps = (state) => ({
  helmet: helmet.selectors.data(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(device.HOC(MyApp))
);
