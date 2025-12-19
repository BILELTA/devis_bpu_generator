import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, FileText, Download, ShoppingCart } from 'lucide-react';

// Données extraites du PDF
const servicesData = {
  hebergement: [
    {
      id: 1,
      name: "Hébergement baie 42U 800x1070mm + 2 PDU basiques",
      unit: "par baie",
      installHT_MF: 1338.00,
      installTTC_MF: 1605.60,
      recurringHT_MF: 669.00,
      recurringTTC_MF: 802.80,
      installHT_MNF: 1338.00,
      installTTC_MNF: 1605.60,
      recurringHT_MNF: 702.45,
      recurringTTC_MNF: 842.94,
      category: "Hébergement"
    },
    {
      id: 2,
      name: "Baie 42U urbanisée mono feed + PDU 21kVA",
      unit: "par baie",
      installHT_MF: 10000.00,
      installTTC_MF: 12000.00,
      recurringHT_MF: 1700.00,
      recurringTTC_MF: 2040.00,
      installHT_MNF: 10000.00,
      installTTC_MNF: 12000.00,
      recurringHT_MNF: 1700.00,
      recurringTTC_MNF: 2040.00,
      category: "Hébergement HD",
      note: "Par tranche de 10 kVA"
    },
    {
      id: 3,
      name: "Baie 42U urbanisée double feed + 2 PDU 21kVA",
      unit: "par baie",
      installHT_MF: 12000.00,
      installTTC_MF: 14400.00,
      recurringHT_MF: 2000.00,
      recurringTTC_MF: 2400.00,
      installHT_MNF: 12000.00,
      installTTC_MNF: 14400.00,
      recurringHT_MNF: 2000.00,
      recurringTTC_MNF: 2400.00,
      category: "Hébergement HD",
      note: "Par tranche de 10 kVA"
    }
  ],
  energie: [
    {
      id: 4,
      name: "Énergie double feed 7kVA - au réel",
      unit: "par kWh",
      installHT_MF: 669.00,
      installTTC_MF: 802.80,
      recurringHT_MF: 0.215,
      recurringTTC_MF: 0.258,
      installHT_MNF: 735.90,
      installTTC_MNF: 883.08,
      recurringHT_MNF: 0.215,
      recurringTTC_MNF: 0.258,
      category: "Énergie"
    },
    {
      id: 5,
      name: "Énergie double feed 7kVA - forfait 2kVA",
      unit: "par baie",
      installHT_MF: 669.00,
      installTTC_MF: 802.80,
      recurringHT_MF: 250.00,
      recurringTTC_MF: 300.00,
      installHT_MNF: 735.90,
      installTTC_MNF: 883.08,
      recurringHT_MNF: 250.00,
      recurringTTC_MNF: 300.00,
      category: "Énergie"
    },
    {
      id: 6,
      name: "Énergie double feed 7kVA - forfait 3kVA",
      unit: "par baie",
      installHT_MF: 669.00,
      installTTC_MF: 802.80,
      recurringHT_MF: 370.00,
      recurringTTC_MF: 444.00,
      installHT_MNF: 735.90,
      installTTC_MNF: 883.08,
      recurringHT_MNF: 370.00,
      recurringTTC_MNF: 444.00,
      category: "Énergie"
    },
    {
      id: 7,
      name: "Énergie double feed 7kVA - forfait 4kVA",
      unit: "par baie",
      installHT_MF: 669.00,
      installTTC_MF: 802.80,
      recurringHT_MF: 500.00,
      recurringTTC_MF: 600.00,
      installHT_MNF: 735.90,
      installTTC_MNF: 883.08,
      recurringHT_MNF: 500.00,
      recurringTTC_MNF: 600.00,
      category: "Énergie"
    }
  ],
  materiel: [
    {
      id: 8,
      name: "Serrures à code (AV + AR)",
      unit: "par baie",
      installHT_MF: 211.85,
      installTTC_MF: 254.22,
      recurringHT_MF: 0,
      recurringTTC_MF: 0,
      installHT_MNF: 211.85,
      installTTC_MNF: 254.22,
      recurringHT_MNF: 0,
      recurringTTC_MNF: 0,
      category: "Matériel"
    },
    {
      id: 9,
      name: "Lecteurs de badges",
      unit: "par baie",
      installHT_MF: 2118.50,
      installTTC_MF: 2542.20,
      recurringHT_MF: 0,
      recurringTTC_MF: 0,
      installHT_MNF: 2118.50,
      installTTC_MNF: 2542.20,
      recurringHT_MNF: 0,
      recurringTTC_MNF: 0,
      category: "Matériel"
    },
    {
      id: 10,
      name: "PDU manageable Zéro U",
      unit: "par PDU",
      installHT_MF: 1338.00,
      installTTC_MF: 1605.60,
      recurringHT_MF: 0,
      recurringTTC_MF: 0,
      installHT_MNF: 1338.00,
      installTTC_MNF: 1605.60,
      recurringHT_MNF: 0,
      recurringTTC_MNF: 0,
      category: "Matériel"
    }
  ],
  rocades: [
    {
      id: 11,
      name: "Rocade cuivre MMR - Baie Client",
      unit: "par rocade",
      installHT_MF: 334.50,
      installTTC_MF: 401.40,
      recurringHT_MF: 25.00,
      recurringTTC_MF: 30.00,
      installHT_MNF: 334.50,
      installTTC_MNF: 401.40,
      recurringHT_MNF: 25.00,
      recurringTTC_MNF: 30.00,
      category: "Rocades"
    },
    {
      id: 12,
      name: "Rocade fibre (6 paires) monomode MMR - Baie",
      unit: "par rocade",
      installHT_MF: 2007.00,
      installTTC_MF: 2408.40,
      recurringHT_MF: 25.00,
      recurringTTC_MF: 30.00,
      installHT_MNF: 2007.00,
      installTTC_MNF: 2408.40,
      recurringHT_MNF: 25.00,
      recurringTTC_MNF: 30.00,
      category: "Rocades"
    },
    {
      id: 13,
      name: "Jarretière (activation cross-connect)",
      unit: "par jarretière",
      installHT_MF: 223.00,
      installTTC_MF: 267.60,
      recurringHT_MF: 15.00,
      recurringTTC_MF: 18.00,
      installHT_MNF: 245.30,
      installTTC_MNF: 294.36,
      recurringHT_MNF: 15.00,
      recurringTTC_MNF: 18.00,
      category: "Rocades"
    }
  ],
  logistique: [
    {
      id: 14,
      name: "Salle de repli sans poste (jour)",
      unit: "par jour",
      installHT_MF: 0,
      installTTC_MF: 0,
      recurringHT_MF: 350.00,
      recurringTTC_MF: 420.00,
      installHT_MNF: 0,
      installTTC_MNF: 0,
      recurringHT_MNF: 350.00,
      recurringTTC_MNF: 420.00,
      category: "Logistique"
    },
    {
      id: 15,
      name: "Salle de repli avec poste (jour)",
      unit: "par jour",
      installHT_MF: 0,
      installTTC_MF: 0,
      recurringHT_MF: 450.00,
      recurringTTC_MF: 540.00,
      installHT_MNF: 0,
      installTTC_MNF: 0,
      recurringHT_MNF: 450.00,
      recurringTTC_MNF: 540.00,
      category: "Logistique"
    },
    {
      id: 16,
      name: "Stockage sécurisé longue durée",
      unit: "par palette/mois",
      installHT_MF: 0,
      installTTC_MF: 0,
      recurringHT_MF: 110.00,
      recurringTTC_MF: 132.00,
      installHT_MNF: 0,
      installTTC_MNF: 0,
      recurringHT_MNF: 110.00,
      recurringTTC_MNF: 132.00,
      category: "Logistique"
    },
    {
      id: 17,
      name: "Salle de réunion 12 personnes (demi-journée)",
      unit: "par demi-journée",
      installHT_MF: 0,
      installTTC_MF: 0,
      recurringHT_MF: 200.00,
      recurringTTC_MF: 240.00,
      installHT_MNF: 0,
      installTTC_MNF: 0,
      recurringHT_MNF: 200.00,
      recurringTTC_MNF: 240.00,
      category: "Logistique"
    }
  ],
  services: [
    {
      id: 18,
      name: "Configuration de services",
      unit: "j/h",
      installHT_MF: 900.00,
      installTTC_MF: 1080.00,
      recurringHT_MF: 0,
      recurringTTC_MF: 0,
      installHT_MNF: 900.00,
      installTTC_MNF: 1080.00,
      recurringHT_MNF: 0,
      recurringTTC_MNF: 0,
      category: "Services techniques"
    },
    {
      id: 19,
      name: "Configuration équipements réseaux",
      unit: "j/h",
      installHT_MF: 900.00,
      installTTC_MF: 1080.00,
      recurringHT_MF: 0,
      recurringTTC_MF: 0,
      installHT_MNF: 900.00,
      installTTC_MNF: 1080.00,
      recurringHT_MNF: 0,
      recurringTTC_MNF: 0,
      category: "Services techniques"
    },
    {
      id: 20,
      name: "Audit cybersécurité",
      unit: "j/h",
      installHT_MF: 900.00,
      installTTC_MF: 1080.00,
      recurringHT_MF: 0,
      recurringTTC_MF: 0,
      installHT_MNF: 900.00,
      installTTC_MNF: 1080.00,
      recurringHT_MNF: 0,
      recurringTTC_MNF: 0,
      category: "Services techniques"
    }
  ]
};

const QuoteGenerator = () => {
  const [memberType, setMemberType] = useState('MF'); // MF ou MNF
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    organization: '',
    email: ''
  });
  const [showCart, setShowCart] = useState(false);

  // Aplatir tous les services
  const allServices = useMemo(() => {
    return Object.values(servicesData).flat();
  }, []);

  // Filtrer les services
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allServices, searchTerm, selectedCategory]);

  // Obtenir les catégories uniques
  const categories = useMemo(() => {
    return ['all', ...new Set(allServices.map(s => s.category))];
  }, [allServices]);

  // Ajouter au panier
  const addToCart = (service) => {
    const existing = cart.find(item => item.id === service.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === service.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
  };

  // Mettre à jour la quantité
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  // Retirer du panier
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculer les totaux
  const totals = useMemo(() => {
    const installHT = cart.reduce((sum, item) => {
      const price = memberType === 'MF' ? item.installHT_MF : item.installHT_MNF;
      return sum + (price * item.quantity);
    }, 0);

    const installTTC = cart.reduce((sum, item) => {
      const price = memberType === 'MF' ? item.installTTC_MF : item.installTTC_MNF;
      return sum + (price * item.quantity);
    }, 0);

    const recurringHT = cart.reduce((sum, item) => {
      const price = memberType === 'MF' ? item.recurringHT_MF : item.recurringHT_MNF;
      return sum + (price * item.quantity);
    }, 0);

    const recurringTTC = cart.reduce((sum, item) => {
      const price = memberType === 'MF' ? item.recurringTTC_MF : item.recurringTTC_MNF;
      return sum + (price * item.quantity);
    }, 0);

    const managementFeeRate = memberType === 'MF' ? 0.05 : 0.10;
    const managementFees = (installHT + recurringHT) * managementFeeRate;

    return {
      installHT,
      installTTC,
      recurringHT,
      recurringTTC,
      managementFees,
      totalHT: installHT + recurringHT + managementFees,
      totalTTC: installTTC + recurringTTC + (managementFees * 1.20)
    };
  }, [cart, memberType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Générateur de Devis</h1>
              <p className="text-sm text-gray-600 mt-1">Groupement d'Infogérance Publique Communautaire</p>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md"
            >
              <ShoppingCart size={20} />
              Panier ({cart.length})
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Catalogue */}
          <div className="lg:col-span-2 space-y-6">
            {/* Configuration */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de membre
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setMemberType('MF')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        memberType === 'MF'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-semibold">Membre Fondateur</div>
                      <div className="text-sm text-gray-600">Frais de gestion: 5%</div>
                    </button>
                    <button
                      onClick={() => setMemberType('MNF')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        memberType === 'MNF'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-semibold">Membre Non-Fondateur</div>
                      <div className="text-sm text-gray-600">Frais de gestion: 10%</div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Nom du client"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Organisation"
                    value={clientInfo.organization}
                    onChange={(e) => setClientInfo({...clientInfo, organization: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Recherche et filtres */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher un service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'Toutes catégories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Liste des services */}
            <div className="space-y-4">
              {filteredServices.map(service => {
                const installPrice = memberType === 'MF' ? service.installHT_MF : service.installHT_MNF;
                const recurringPrice = memberType === 'MF' ? service.recurringHT_MF : service.recurringHT_MNF;
                const inCart = cart.find(item => item.id === service.id);

                return (
                  <div key={service.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{service.unit}</p>
                        {service.note && (
                          <p className="text-xs text-amber-600 mb-3 italic">{service.note}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm">
                          {installPrice > 0 && (
                            <div>
                              <span className="text-gray-600">Installation:</span>
                              <span className="font-semibold text-gray-900 ml-2">
                                {installPrice.toFixed(2)} € HT
                              </span>
                            </div>
                          )}
                          {recurringPrice > 0 && (
                            <div>
                              <span className="text-gray-600">Récurrent:</span>
                              <span className="font-semibold text-gray-900 ml-2">
                                {recurringPrice.toFixed(2)} € HT/mois
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(service)}
                        className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                      >
                        <Plus size={18} />
                        {inCart ? `Ajouté (${inCart.quantity})` : 'Ajouter'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colonne droite - Panier */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingCart className="text-indigo-600" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Panier ({cart.length})</h2>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
                    <p>Votre panier est vide</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-sm text-gray-900 flex-1">{item.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                            <span className="text-sm text-gray-600">{item.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totaux */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Installation HT:</span>
                        <span className="font-semibold">{totals.installHT.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Récurrent HT/mois:</span>
                        <span className="font-semibold">{totals.recurringHT.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between text-sm text-amber-700">
                        <span>Frais de gestion ({memberType === 'MF' ? '5' : '10'}%):</span>
                        <span className="font-semibold">{totals.managementFees.toFixed(2)} €</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total HT:</span>
                          <span>{totals.totalHT.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Total TTC:</span>
                          <span>{totals.totalTTC.toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold shadow-md">
                      <Download size={20} />
                      Générer le devis PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;