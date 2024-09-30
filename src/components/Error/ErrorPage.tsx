import { Link } from "react-router-dom";
import "./style.css";
interface IProps {
  statusCode?: number;
  message?: string;
}

const ErrorPage = ({
  statusCode = 404,
  message = "Page Not Found",
}: IProps) => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>{statusCode}</h1>
          <h2>{message}</h2>
        </div>
        <h3 className="text-gray-400 mb-3">Oops! Something went wrong</h3>
        <Link to="/">Homepage</Link>
      </div>
    </div>
  );
};
export default ErrorPage;
