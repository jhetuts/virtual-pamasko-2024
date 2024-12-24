interface PlayerRecord {
  name: string;
  ipAddress: string;
  prize: number;
  timestamp: string;
}

const STORAGE_KEY = 'vpp';

export class LocalStorageService {
  private encode(data: any): string {
    return btoa(JSON.stringify(data));
  }

  private decode(data: string): any {
    return JSON.parse(atob(data));
  }

  getPlayers(): PlayerRecord[] {
    const encoded = localStorage.getItem(STORAGE_KEY);
    if (!encoded) return [];
    return this.decode(encoded);
  }

  addPlayer(playerData: PlayerRecord) {
    const players = this.getPlayers();
    players.push(playerData);
    localStorage.setItem(STORAGE_KEY, this.encode(players));
    return playerData;
  }

  hasPlayerPlayed(ipAddress: string): boolean {
    const players = this.getPlayers();
    return players.some(player => player.ipAddress === ipAddress);
  }

  clearPlayers() {
    localStorage.removeItem(STORAGE_KEY);
  }
}