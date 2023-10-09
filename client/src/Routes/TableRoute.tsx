import { useEffect, useState } from "react";
import { socket } from "../utils/SocketUtils";
import { useSnackbar } from "../Snackbar";
import CollegeScoreList from "../types/CollegeScoreList";
import Button from "../components/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface TableRouteProps {}

const TableRoute: React.FC<TableRouteProps> = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [collegeScoreList, setCollegeScoreList] = useState<CollegeScoreList[]>([]);
  const [currentDetails, setCurrentDetails] = useState<CollegeScoreList | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);

      fetch("http://localhost:5000/api/entries").then(async res => {
        setCollegeScoreList((await res.json()).sort((a: CollegeScoreList, b: CollegeScoreList) => b.score - a.score));
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      enqueueSnackbar("No internet connection");
    };

    const onNewEntry = (entry: CollegeScoreList) => {
      setCollegeScoreList(oldCollegeScoreList => {
        let newCollegeScoreList = [...oldCollegeScoreList];
        newCollegeScoreList.splice(
          newCollegeScoreList.findIndex(e => e.collegeName === entry.collegeName),
          1,
          entry
        );
        return newCollegeScoreList.sort((a: CollegeScoreList, b: CollegeScoreList) => b.score - a.score);
      });
    };

    socket.on("connect", onConnect);
    socket.on("new-entry", onNewEntry);
    socket.on("disconnect", onDisconnect);
    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("newEntry", onNewEntry);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [enqueueSnackbar]);

  return (
    <div className="flex items-center w-full flex-col">
      {!currentDetails && (
        <div className="w-fit flex items-center flex-col bg-white px-20 py-10 my-20 rounded-xl">
          <div className="my-5">
            <span className="text-6xl font-semibold">Inter-IIT Scoreboard</span>
          </div>
          <table>
            <thead>
              <tr>
                <th className="text-xl py-5 px-10 mx-4">Rank</th>
                <th className="text-xl py-5 px-10 mx-4">College Name</th>
                <th className="text-xl py-5 px-10 mx-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {collegeScoreList.map((entry, idx) => (
                <tr className="cursor-pointer" key={idx}>
                  <td className="text-xl py-5 px-10 mx-4">{idx + 1}.</td>
                  <td className="text-xl py-5 px-10 mx-4">{entry.collegeName}</td>
                  <td className="text-xl py-5 px-10 mx-4">{entry.score}</td>
                  <td className="text-xl py-5 px-10 mx-4">
                    <Button
                      onClick={() => {
                        setCurrentDetails(entry);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!!currentDetails && (
        <div className="w-fit flex items-center flex-col bg-white px-20 py-10 my-20 rounded-xl">
          <div className="my-5 flex justify-between w-full align-center">
            <div>
              <span className="text-6xl font-semibold mr-20">
                <ArrowBackIosIcon
                  className="mr-4 my-auto cursor-pointer"
                  onClick={() => {
                    setCurrentDetails(null);
                  }}
                />

                {currentDetails.collegeName}
              </span>
            </div>
            <div className="h-fit my-auto">
              <span className="text-3xl h-fit">Points: {currentDetails.score}</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="text-xl py-5 px-10 mx-4">Sr. no</th>
                <th className="text-xl py-5 px-10 mx-4">Game</th>
                <th className="text-xl py-5 px-10 mx-4">Medal</th>
                <th className="text-xl py-5 px-10 mx-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {currentDetails.games.map((entry, idx) => (
                <tr className="cursor-pointer" key={idx}>
                  <td className="text-xl py-5 px-10 mx-4">{idx + 1}.</td>
                  <td className="text-xl py-5 px-10 mx-4">{entry.sport}</td>
                  <td className="text-xl py-5 px-10 mx-4">{entry.medal}</td>
                  <td className="text-xl py-5 px-10 mx-4">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableRoute;
