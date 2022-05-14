
  import Document, { DocumentContext,Html, Head, Main, NextScript } from 'next/document'
  import Link from 'next/link'
 
 class MyDocument extends Document {
   static async getInitialProps(ctx) {
     const originalRenderPage = ctx.renderPage
 
     ctx.renderPage = () =>
       originalRenderPage({
         // useful for wrapping the whole react tree
         enhanceApp: (App) => App,
         // useful for wrapping in a per-page basis
         enhanceComponent: (Component) => Component,
       })
 
     // Run the parent `getInitialProps`, it now includes the custom `renderPage`
     const initialProps = await Document.getInitialProps(ctx)
 
     return initialProps
   }
    render() {
     return (
       <Html lang="en">
         <Head>
             <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link async rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
      <link  async href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,800italic,300italic,600italic,400,800,700,600,300"/>
      <link async href="http://fonts.googleapis.com/css?family=Tahoma"/>
      <link async rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
      <link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css"/>  
      <link  rel="stylesheet" type="text/css" href="/css/lightslider.css"/>
      <link rel="stylesheet" type="text/css" href="/css/jquery.countdown.css"/>
      <link rel="stylesheet" type="text/css" href="/css/style.css"/>
      <link rel="stylesheet" type="text/css" href="/css/custom.css"/>
      <link rel="stylesheet" type="text/css" href="/css/my/jquery.bxslider.css"/>
      <link rel="stylesheet" type="text/css" href="/css/owl.carousel.min.css"/>
      <link rel="stylesheet" type="text/css" href="/css/owl.theme.default.min.css "/>
          </Head>
         <body >          
           <Main />
           <NextScript />   
                <script type="text/javascript" src="/js/jquery-1.10.2.js"></script>
                <script type="text/javascript" src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>  
                <script type="text/javascript" src="/js/bootstrap.min.js"></script>
                <script type="text/javascript" src="/js/mycustom.js"></script>
                <script type="text/javascript" src="/js/elevatezoom.js"></script>  
                <script type="text/javascript" src="/js/owl.carousel.js"></script>
                <script type="text/javascript" src="/js/owl.carousel.js"></script>
                <script type="text/javascript" src="/js/lightslider.js"></script>
                <script type="text/javascript" src="/css/my/jquery.bxslider.min.js"></script> 
         </body>
       </Html>
     )
   }
 }
 
 export default MyDocument
 