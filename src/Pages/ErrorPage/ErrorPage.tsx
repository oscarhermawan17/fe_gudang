import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const errorMessage = (error as Error).message;
  const errorStatusText = (error as any).statusText;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorStatusText || errorMessage}</i>
      </p>
    </div>
  );
}