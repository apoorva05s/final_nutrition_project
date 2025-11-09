import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PantryItem } from '@/utils/mockData';
import { Plus, Trash2, Edit2, AlertTriangle } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export function PantryManager() {
  const { pantryItems, addPantryItem, deletePantryItem } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    category: 'Other'
  });

  const handleAdd = () => {
    if (newItem.name && newItem.quantity && newItem.expiryDate) {
      addPantryItem({
        id: Date.now().toString(),
        ...newItem
      });
      setNewItem({ name: '', quantity: '', expiryDate: '', category: 'Other' });
      setIsAdding(false);
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (days: number) => {
    if (days < 0) return { label: 'Expired', variant: 'destructive' as const };
    if (days <= 3) return { label: `${days}d left`, variant: 'destructive' as const };
    if (days <= 7) return { label: `${days}d left`, variant: 'secondary' as const };
    return { label: 'Fresh', variant: 'default' as const };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-semibold">Pantry Inventory</h2>
          <p className="text-muted-foreground">Manage your ingredients and track expiry dates</p>
        </div>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          data-testid="button-add-item"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Add New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ingredient Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="e.g., Tomatoes"
                data-testid="input-item-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                placeholder="e.g., 500g"
                data-testid="input-item-quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                type="date"
                value={newItem.expiryDate}
                onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                data-testid="input-item-expiry"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                placeholder="e.g., Vegetables"
                data-testid="input-item-category"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAdd} data-testid="button-save-item">Save</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)} data-testid="button-cancel">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-sm">Ingredient</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Expiry Date</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pantryItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">
                    No items in pantry. Add your first ingredient to get started!
                  </td>
                </tr>
              ) : (
                pantryItems.map((item) => {
                  const daysLeft = getDaysUntilExpiry(item.expiryDate);
                  const status = getExpiryStatus(daysLeft);
                  
                  return (
                    <tr key={item.id} className="border-b hover-elevate" data-testid={`row-pantry-${item.id}`}>
                      <td className="py-4 px-4 font-medium">{item.name}</td>
                      <td className="py-4 px-4">{item.quantity}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{item.category}</td>
                      <td className="py-4 px-4 text-sm">{item.expiryDate}</td>
                      <td className="py-4 px-4">
                        <Badge variant={status.variant} className="flex items-center gap-1 w-fit">
                          {daysLeft <= 3 && <AlertTriangle className="w-3 h-3" />}
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deletePantryItem(item.id)}
                          data-testid={`button-delete-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
