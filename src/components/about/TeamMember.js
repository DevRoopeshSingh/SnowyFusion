import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const TeamMember = ({ name, role, image, bio, social }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-64">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 dark:text-white">{name}</h3>
        <p className="text-primary-500 mb-3">{role}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{bio}</p>
        {social && (
          <div className="flex gap-4">
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500">
                <FaLinkedin size={20} />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500">
                <FaTwitter size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamMember; 