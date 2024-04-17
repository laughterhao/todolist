import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <header>導覽列</header>
      <Component {...pageProps} />
      <footer>頁腳</footer>
    </div>
  );
}
