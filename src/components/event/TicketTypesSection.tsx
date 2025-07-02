
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";

export interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

interface TicketTypesSectionProps {
  ticketTypes: TicketType[];
  onTicketTypesChange: (ticketTypes: TicketType[]) => void;
}

const TicketTypesSection = ({ ticketTypes, onTicketTypesChange }: TicketTypesSectionProps) => {
  const [enabledTypes, setEnabledTypes] = useState<Set<string>>(new Set());

  const defaultTicketTypes: Omit<TicketType, 'id'>[] = [
    { name: "General Ticket", price: 0, quantity: 100, description: "Standard admission" },
    { name: "VIP Pass", price: 0, quantity: 50, description: "Premium access with exclusive benefits" },
    { name: "Early Bird", price: 0, quantity: 75, description: "Discounted price for early bookings" }
  ];

  const handleTicketTypeToggle = (typeName: string, checked: boolean) => {
    const newEnabledTypes = new Set(enabledTypes);
    
    if (checked) {
      newEnabledTypes.add(typeName);
      const defaultType = defaultTicketTypes.find(t => t.name === typeName);
      if (defaultType) {
        const newTicketType: TicketType = {
          ...defaultType,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        };
        onTicketTypesChange([...ticketTypes, newTicketType]);
      }
    } else {
      newEnabledTypes.delete(typeName);
      const updatedTicketTypes = ticketTypes.filter(t => t.name !== typeName);
      onTicketTypesChange(updatedTicketTypes);
    }
    
    setEnabledTypes(newEnabledTypes);
  };

  const handleTicketTypeUpdate = (id: string, field: keyof TicketType, value: string | number) => {
    const updatedTicketTypes = ticketTypes.map(ticket => 
      ticket.id === id ? { ...ticket, [field]: value } : ticket
    );
    onTicketTypesChange(updatedTicketTypes);
  };

  const handleRemoveTicketType = (id: string) => {
    const ticketToRemove = ticketTypes.find(t => t.id === id);
    if (ticketToRemove) {
      const newEnabledTypes = new Set(enabledTypes);
      newEnabledTypes.delete(ticketToRemove.name);
      setEnabledTypes(newEnabledTypes);
    }
    
    const updatedTicketTypes = ticketTypes.filter(t => t.id !== id);
    onTicketTypesChange(updatedTicketTypes);
  };

  const addCustomTicketType = () => {
    const newTicketType: TicketType = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: "Custom Ticket",
      price: 0,
      quantity: 100,
      description: ""
    };
    onTicketTypesChange([...ticketTypes, newTicketType]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Ticket Types (Optional)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose which ticket types you want to offer for your event
        </p>
        
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {defaultTicketTypes.map((type) => (
            <div key={type.name} className="flex items-center space-x-2 p-3 border rounded-lg">
              <Checkbox
                id={type.name}
                checked={enabledTypes.has(type.name)}
                onCheckedChange={(checked) => handleTicketTypeToggle(type.name, checked as boolean)}
              />
              <div className="flex-1">
                <label 
                  htmlFor={type.name} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {type.name}
                </label>
                <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {ticketTypes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium">Configure Ticket Types</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCustomTicketType}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Custom Type
            </Button>
          </div>
          
          {ticketTypes.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{ticket.name}</CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTicketType(ticket.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Ticket Name</label>
                    <Input
                      value={ticket.name}
                      onChange={(e) => handleTicketTypeUpdate(ticket.id, 'name', e.target.value)}
                      placeholder="Ticket name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Price (NPR)</label>
                    <Input
                      type="number"
                      value={ticket.price}
                      onChange={(e) => handleTicketTypeUpdate(ticket.id, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Quantity</label>
                    <Input
                      type="number"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketTypeUpdate(ticket.id, 'quantity', parseInt(e.target.value) || 0)}
                      placeholder="100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Description (Optional)</label>
                  <Input
                    value={ticket.description || ''}
                    onChange={(e) => handleTicketTypeUpdate(ticket.id, 'description', e.target.value)}
                    placeholder="Describe what's included with this ticket"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketTypesSection;
