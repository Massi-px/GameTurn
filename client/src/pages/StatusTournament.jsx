import React, {useEffect, useState} from 'react';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { Box } from "@mui/material";
import apiInstance from "../utils/api/apiService";
import Typography from "@mui/material/Typography";

const StatusTournament = () => {

    const [Matchs, setMatchs] = useState([]);

    const fetchMatchs = async () => {
        let listMatch = await apiInstance.exec('tournaments/listMatch/:','GET')
        setMatchs(listMatch)
    }

    useEffect(() => {
        fetchMatchs();
    }, []);

    let matches = [
        {



            id: Matchs.id,
            name: "Match 1",
            nextMatchId: 2,
            tournamentRoundText: "Round 1",
            startTime: "2023-06-23T10:00:00",
            state: "DONE",
            participants: [
                {
                    id: Matchs.player1_id,
                    resultText: "WON",
                    isWinner: true,
                    status: "PLAYED",
                    name: `player ${Matchs.player1_id}`,
                },
                {
                    id: 2,
                    resultText: null,
                    isWinner: false,
                    status: null,
                    name: "player2",
                },
            ],
        },
        {
            id: 2,
            name: "Match 2",
            nextMatchId: null,
            tournamentRoundText: "Round 2",
            startTime: "2023-06-24T13:00:00",
            state: "NO_PARTY",
            participants: [
                {
                    id: 3,
                    resultText: null,
                    isWinner: false,
                    status: null,
                    name: "Team C",
                },
                {
                    id: 4,
                    resultText: null,
                    isWinner: false,
                    status: null,
                    name: "Team D",
                },
            ],
        },
        {
            id: 2,
            name: "Match 2",
            nextMatchId: null,
            tournamentRoundText: "Round 2",
            startTime: "2023-06-24T13:00:00",
            state: "NO_PARTY",
            participants: [
                {
                    id: 3,
                    resultText: null,
                    isWinner: false,
                    status: null,
                    name: "Team C",
                },
                {
                    id: 4,
                    resultText: null,
                    isWinner: false,
                    status: null,
                    name: "Team D",
                },
            ],
        },
    ];

    return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '100px' }}>
            <div>
                <h1>Match List</h1>
                <p>test</p>
                <p>test : {Matchs.id}</p>
                {Matchs.map((match) => (
                    <div key={match.id}>
                        <p>ID: {match.id}</p>
                        <p>Player 1 ID: {match.player1_id}</p>
                        <p>Player 2 ID: {match.player2_id}</p>
                        <p>P1_score_1 SCORE : {match.p1_score_1}</p>
                        <p>P1_score_1 SCORE : {match.p1_score_2}</p>
                        <p>P1_score_1 SCORE : {match.p2_score_1}</p>
                        <p>P1_score_1 SCORE : {match.p2_score_2}</p>
                        <p>stage: {match.stage}</p>
                        <p>tournament ID : {match.tournament_id}</p>
                    </div>
                ))}
            </div>

            <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '100px' }}>
                <SingleEliminationBracket
                    matches={matches}
                    matchComponent={Match}
                    svgWrapper={({ children, ...props }) => (
                        <SVGViewer width={10000} height={10000} {...props}>
                            {children}
                        </SVGViewer>
                    )}
                />
            </Box>

        </Box>


    );
};

export default StatusTournament;
