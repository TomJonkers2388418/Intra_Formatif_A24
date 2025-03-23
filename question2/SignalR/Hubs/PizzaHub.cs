using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            _pizzaManager.AddUser();

            // Update le nombre de users
            await Clients.All.SendAsync("updateNbUsers", _pizzaManager.NbConnectedUsers);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnConnectedAsync();
            _pizzaManager.RemoveUser();

            // Update le nombre de users
            await Clients.All.SendAsync("updateNbUsers", _pizzaManager.NbConnectedUsers);
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            // Ajouter au groupe
            await Groups.AddToGroupAsync(Context.ConnectionId, _pizzaManager.GetGroupName(choice));

            // Update money and nbPizzas
            await Clients.Group(_pizzaManager.GetGroupName(choice))
                         .SendAsync("UpdateNbPizzasAndMoney", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);

            // Update pizzaPrice
            await Clients.Group(_pizzaManager.GetGroupName(choice))
                         .SendAsync("UpdatePizzaPrice", _pizzaManager.PIZZA_PRICES[(int)choice]);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            // Retirer du groupe
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, _pizzaManager.GetGroupName(choice));
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);

            // Update money
            await Clients.Group(_pizzaManager.GetGroupName(choice))
                         .SendAsync("UpdateMoney", _pizzaManager.Money[(int)choice]);

        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);

            // Update money and nbPizzas
            await Clients.Group(_pizzaManager.GetGroupName(choice))
                         .SendAsync("UpdateNbPizzasAndMoney", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);
        }
    }
}
