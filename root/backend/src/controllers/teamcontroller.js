// to fetch the team names and its particular object ids

app.get("/getTeamNames", async (req, res) => {
  try {
    const teams = await Team.find({}, "_id name");
    const idToNameMap = {};
    teams.forEach((team) => {
      idToNameMap[team._id] = team.name;
    });

    res.json(idToNameMap);
  } catch (error) {
    console.error("Error in finding the list of Team Names", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// to fetch the paticular team information based on the team id
// Route to fetch all players of a specific team
app.get("/getteam", async (req, res) => {
  try {
    const teamName = req.query.teamName;
    console.log(teamName);
    const teamData = await Player.find({ team: teamName });
    console.log(teamData);
    if (teamData.length === 0) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(teamData);
  } catch (error) {
    console.error("Error in fetching team data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for adding user teams
app.post("/adduserteams", (req, res) => {
  const teamData = req.body;
  console.log(teamData);
  // Convert the base64 image data to a Buffer
  const imageBuffer = Buffer.from(teamData.image.data, "base64");

  // Create a new player using the Player model
  const newPlayer = new Player({
    team: teamData.team,
    role: teamData.role,
    name: teamData.name,
    matches: teamData.matches,
    image: {
      data: imageBuffer,
      contentType: teamData.image.contentType,
    },
  });

  // Save the new player to the database
  newPlayer
    .save()
    .then(() => {
      console.log("New player added:", newPlayer);
      res.status(201).json({ message: "Player added successfully" });
    })
    .catch((error) => {
      console.error("Error adding player:", error);
      res.status(500).json({ message: "Failed to add player" });
    });
});
