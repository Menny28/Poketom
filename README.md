# Pokemon Clone - GBA Style

Un gioco di combattimento stile Pokemon in stile GBA con grafica pixel art, sprite animati e sistema di battaglia completo, giocabile direttamente nel browser web.

## Caratteristiche
- 3 Pokemon iniziali con tipi distinti (fuoco, erba, acqua)
- Sistema di combattimento a turni con colpi critici e Advantage Battle
- Grafica pixel art in stile GBA con sprite animati
- Modalità a serie: vinci e continua a combattere
- Sistema di tipicità (super efficace, non molto efficace, nessun effetto)
- Log di battaglia con animazioni e messaggi stilizzati
- Interfaccia utente in stile GBA con barre HP animate
- Suoni SFX in stile GBA per combattimenti e menu
- 6 Pokemon nemici unici (Ratto, Serpente, Uccello, più varianti di livello)
- Sistema di livello e crescita per Pokemon
- Combo e sequenze di attacchi potenziati
- Sprite animati per Pokemon (Piro, Verde, Aqua, Ratto, Serpente, Uccello)

## Come giocare
1. Seleziona il tuo Pokemon cliccando sulla carta Pokemon
2. Clicca "Inizia la Battaglia" quando sei pronto
3. Seleziona un attacco dal tuo Pokemon per attaccare
4. Clicca sul pulsante "Sì" per continuare dopo ogni vittoria
5. Il gioco finisce quando il tuo Pokemon si arrende

## Struttura del Progetto
- `index.html` - Interfaccia utente principale in stile GBA
- `style.css` - CSS in stile GBA con effetti pixel art
- `script.js` - Gioco completo con logica di battaglia, sistema di tipi e suoni
- `assets/images/` - Sprite pixel art per Pokemon (Piro, Verde, Aqua, Ratto, Serpente, Uccello)
- `pokemon_game.py` - Versione Python di base per combattimenti terminali (per riferimento)

## Sistema di Tipi
- Fuoco > Erba > Acqua > Fuoco (ciclo di vantaggio)
- Tipo Normale per attacchi neutrali
- Sistema di danni basato sul tipo (0.75x per stesso tipo, 1.0x altrimenti)

## Note di Sviluppo
Ispirato dai classici GBA come Pokémon Ruby/Sapphire/Emerald, Final Fantasy Tactics, e Gameboy Advance games in generale. Utilizza immagini pixel art in stile GBA, sprite animati e un'interfaccia utente ispirata ai menu di gioco dell'epoca. Include anche suoni SFX in stile GBA e meccaniche di combattimento avanzate.

## Modalità di Gioco
Gioca online: Apri `index.html` in un browser web per la migliore esperienza.
Oppure gioca nella console: `python pokemon_game.py` per una semplice versione testuale.

## Combattimento Strategico
Sfrutta i vantaggi di tipo per infliggere danni extra!
- Gli attacchi Fuoco sono super efficaci contro i Pokemon Erba
- Gli attacchi Erba sono super efficaci contro i Pokemon Acqua
- Gli attacchi Acqua sono super efficaci contro i Pokemon Fuoco
- Gli attacchi dello stesso tipo sono meno efficaci (0.75x)
- Usa mosse di tipo normale per attacchi neutrali

Goditi il tuo impero Pokemon!
