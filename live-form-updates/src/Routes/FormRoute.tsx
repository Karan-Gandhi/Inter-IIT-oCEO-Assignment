import { useState } from "react";
import { Link } from "react-router-dom";
import Textfield from "../components/Textfield";
import Button from "../components/Button";

interface FormRouteProps {}

const FormRoute: React.FC<FormRouteProps> = () => {
  const [collegeName, setCollegeName] = useState<string>("");
  const [sport, setSport] = useState<string>("");
  const [medal, setMedal] = useState<string>("");
  const [points, setPoints] = useState<number>(0);

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full lg:w-1/2 lg:min-w-128 bg-white lg:h-fit h-screen px-16 py-14 flex flex-col justify-center items-center lg:border lg:rounded-lg">
        <div className="flex flex-col items-center min-w-full">
          <div className="text-4xl font-bold mb-8">
            <span>Add entry to the Inter-IIT Scoreboard</span>
          </div>
          {/* <form onSubmit={handleSubmit} className="w-full flex gap-2 flex-col"> */}
          <form className="w-full flex gap-2 flex-col">
            <div>
              <Textfield
                onChange={value => {
                  setCollegeName(value);
                }}
                label="College Name"
                placeholder="Enter college name"
              />
            </div>
            <div>
              <Textfield
                onChange={value => {
                  setSport(value);
                }}
                label="Sport"
                placeholder="Enter sport name"
              />
            </div>
            <div>
              <Textfield
                type="text"
                onChange={value => {
                  setMedal(value);
                }}
                label="Medal"
                placeholder="Gold, Silver or Bronze"
              />
            </div>
            <div>
              <Textfield
                type="number"
                onChange={value => {
                  setPoints(parseInt(value));
                }}
                label="Points"
                placeholder="Enter points"
                hintText="Must be a number"
              />
            </div>
            <div className="mb-2 mt-2	flex justify-end">
              <div className="font-medium ml-8" style={{ color: "#000" }}>
                <Link to="/signup">
                  <span className="nav-link">View the leaderboard</span>
                </Link>
              </div>
            </div>
            <div>
              <Button type="submit">Add</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRoute;
