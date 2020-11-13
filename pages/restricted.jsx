import fetch from "isomorphic-unfetch";
import Router from "next/router";
export default function Restricted({ data }) {
  return (
    <div>
      <h1>THis is a restricted page, congrats if you can see this</h1>;
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

Restricted.getInitialProps = async ({ req, res }) => {
  const cookie = req?.headers.cookie;
  const response = await fetch(`http://localhost:3000/api/restricted`, {
    headers: {
      cookie,
    },
  });

  if (response.status === 401) {
    // not authorized to access this
    if (typeof window === "undefined") {
      // on the server so no window
      res.writeHead(302, { location: "/login" });
      res.end();
      return;
    } else {
      Router.push("/login");
      return {};
    }
  }

  const json = await response.json();

  return {
    data: json,
  };
};
