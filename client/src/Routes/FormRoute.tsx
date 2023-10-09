import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Textfield from "../components/Textfield";
import Button from "../components/Button";
import { socket } from "../utils/SocketUtils";
import { useSnackbar } from "../Snackbar";
import DefaultLoader from "../components/DefaultLoader";

interface FormRouteProps {}

const FormRoute: React.FC<FormRouteProps> = () => {
  const [collegeName, setCollegeName] = useState<string>("");
  const [sport, setSport] = useState<string>("");
  const [medal, setMedal] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!isConnected) {
        enqueueSnackbar("No internet connection");
        return;
      }
      setIsLoading(true);
      socket.timeout(5000).emit(
        "new-entry",
        {
          collegeName: collegeName.trim().toUpperCase(),
          sport: sport.trim().toUpperCase(),
          medal: medal.trim().toUpperCase(),
          points,
        },
        (err: any) => {
          console.log(err);
          if (err) {
            enqueueSnackbar("Something went wrong");
            setIsLoading(false);
            return;
          }
          setIsLoading(false);
          enqueueSnackbar("Entry added successfully");
        }
      );
    },
    [collegeName, enqueueSnackbar, isConnected, medal, points, sport]
  );

  if (isLoading)
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <DefaultLoader />
      </div>
    );

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full lg:w-1/2 lg:min-w-128 bg-white lg:h-fit h-screen px-16 py-14 flex flex-col justify-center items-center lg:border lg:rounded-lg">
        <div className="flex flex-col items-center min-w-full">
          <div className="text-4xl font-bold mb-8">
            <span>Add entry to the Inter-IIT Scoreboard</span>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex gap-2 flex-col">
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
                <Link to="/scoreboard/">
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
