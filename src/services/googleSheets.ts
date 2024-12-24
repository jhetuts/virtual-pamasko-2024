const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_NAME = import.meta.env.VITE_GOOGLE_SHEET_NAME;

interface PlayerRecord {
  name: string;
  ipAddress: string;
  prize: number;
  timestamp: string;
}

export class GoogleSheetsService {
  async getPlayers(): Promise<PlayerRecord[]> {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
    );
    const data = await response.json();
    return this.parseRows(data.values);
  }

  async addPlayer(playerData: PlayerRecord) {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}:append?key=${API_KEY}&insertDataOption=INSERT_ROWS&valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          range: SHEET_NAME,
          majorDimension: "ROWS",
          values: [[
            playerData.name,
            playerData.ipAddress,
            playerData.prize,
            playerData.timestamp
          ]]
        })
      }
    );
    return response.json();
  }
  

  async hasPlayerPlayed(ipAddress: string): Promise<boolean> {
    const players = await this.getPlayers();
    return players.some(player => player.ipAddress === ipAddress);
  }

  private parseRows(rows: string[][]): PlayerRecord[] {
    const [, ...data] = rows;
    return data.map(row => ({
      name: row[0],
      ipAddress: row[1],
      prize: Number(row[2]),
      timestamp: row[3]
    }));
  }
}