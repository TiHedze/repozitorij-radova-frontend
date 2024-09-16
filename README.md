# RepozitorijRadovaFrontend

Ovo je klijentska aplikacija razvijena za potrebe diplomskog rada. Izvorni kod poslužiteljske aplikacije nalazi se na https://github.com/TiHedze/repozitorij-radova.

### Upute za pokretanje
Nakon pokretanja poslužiteljske aplikacije (kako je opisano u https://github.com/TiHedze/repozitorij-radova),  klijentska aplikacija pokreće se naredbom:
```
docker build -t repozitorij-radova-fe . && docker run -it repozitorij-radova-fe
```
Nakon pokretanja, aplikacija je dostupna na adresi localhost:4200