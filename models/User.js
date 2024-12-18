export class User {
  constructor(id, name, username, email, lat, lng, phone, website) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.lat = lat;
    this.lng = lng;
    this.phone = phone;
    this.website = website;
    // Generar un color aleatorio para el avatar
    this.avatarBackground = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }

  // Determina si un color es oscuro basado en su luminosidad
  isColorDark(hexcolor) {
    const r = parseInt(hexcolor.slice(0, 2), 16);
    const g = parseInt(hexcolor.slice(2, 4), 16);
    const b = parseInt(hexcolor.slice(4, 6), 16);
    // Calcular la luminosidad usando la fórmula YIQ
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq < 128; // < 128 se considera oscuro
  }

  getAvatarUrl(size = 40) {
    const textColor = this.isColorDark(this.avatarBackground) ? 'ffffff' : '000000';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&size=${size}&background=${this.avatarBackground}&color=${textColor}`;
  }
}
