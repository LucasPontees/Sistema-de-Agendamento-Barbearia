import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-barber-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/favicon.ico" alt="Barber VIP Club" className="h-10 w-10" />
              <span className="text-xl font-bold text-barber-gold">BARBA VIP</span>
            </div>
            <p className="text-gray-400 mb-4">Serviços de barbearia premium com benefícios exclusivos para membros do clube VIP.</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-barber-gold">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-barber-gold">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-barber-gold">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-barber-gold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Serviços</Link></li>
              <li><Link to="/appointments" className="text-gray-400 hover:text-white">Agendar</Link></li>
              <li><Link to="/membership" className="text-gray-400 hover:text-white">Clube VIP</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white">Galeria</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-barber-gold">Serviços</h3>
            <ul className="space-y-2">
              <li><Link to="/services/haircut" className="text-gray-400 hover:text-white">Corte de Cabelo</Link></li>
              <li><Link to="/services/beard" className="text-gray-400 hover:text-white">Aparo de Barba</Link></li>
              <li><Link to="/services/shave" className="text-gray-400 hover:text-white">Barbear com Toalha Quente</Link></li>
              <li><Link to="/services/color" className="text-gray-400 hover:text-white">Coloração</Link></li>
              <li><Link to="/services/facials" className="text-gray-400 hover:text-white">Tratamentos Faciais</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-barber-gold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-barber-gold flex-shrink-0 mt-1" />
                <span className="text-gray-400">Rua do Barbeiro, 123, Cidade Alta, 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-barber-gold flex-shrink-0" />
                <span className="text-gray-400">(92) 98488-6610</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-barber-gold flex-shrink-0" />
                <span className="text-gray-400">eulpontes@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Barba VIP. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
