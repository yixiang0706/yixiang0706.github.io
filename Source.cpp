#include<iostream>
#include<stdio.h>
#include <time.h>
#include<string>
using namespace std;
struct _2dice
{
	int Dice1;
	int Dice2;
};
struct _3cards
{
	string color[4] = {"S","H","D","C"};
	string card[13] = { "A","2","3","4","5","6","7","8","9","10","J","Q","K"};
	string firstcard[2];
	string secondcard[2];
	string thirdcard[2];
};
struct best_choice
{
	int bestDice;
	string bestCard[2];
};
best_choice* pick_best(_2dice* dice, _3cards* card);
int main()
{
	srand(2);
	_2dice* dice = new _2dice();
	dice->Dice1 = 1 + rand() % 6;
	dice->Dice2 = 1 + rand() % 6;
	cout << dice->Dice1 << endl << dice->Dice2 << endl;

	_3cards* card = new _3cards();
	card->firstcard[0] = card->color[rand() % 4];
	card->firstcard[1] = card->card[rand() % 13];
	card->secondcard[0] = card->color[rand() % 4];
	card->secondcard[1] = card->card[rand() % 13];
	card->thirdcard[0] = card->color[rand() % 4];
	card->thirdcard[1] = card->card[rand() % 13];
	cout << card->firstcard[0] << card->firstcard[1] << endl;
	cout << card->secondcard[0] << card->secondcard[1] << endl;
	cout << card->thirdcard[0] << card->thirdcard[1] << endl;
	
	best_choice *Best= pick_best(dice,card);
	cout << Best->bestDice << endl << Best->bestCard[0] << Best->bestCard[1] << endl;
	return 0;
}
best_choice* pick_best(_2dice* dice, _3cards* card)
{
	best_choice* Best = new best_choice();
	if (dice->Dice1 > dice->Dice2) {
		Best->bestDice = dice->Dice1;
	}
	else {
		Best->bestDice = dice->Dice2;
	}


	if (card->firstcard[1] > card->secondcard[1]) {
		if (card->firstcard[1] > card->thirdcard[1]) {
			Best->bestCard[0] = card->firstcard[0];
			Best->bestCard[1] = card->firstcard[1];
		}
		else{
			Best->bestCard[0] = card->thirdcard[0];
			Best->bestCard[1] = card->thirdcard[1];
		}
	}
	else {
		if (card->secondcard[1] > card->thirdcard[1]) {
			Best->bestCard[0] = card->secondcard[0];
			Best->bestCard[1] = card->secondcard[1];
		}
		else {
			Best->bestCard[0] = card->thirdcard[0];
			Best->bestCard[1] = card->thirdcard[1];
		}
	}

	return Best;
}