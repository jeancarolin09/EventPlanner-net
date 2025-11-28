<?php

namespace App\Repository;

namespace App\Repository;

use App\Entity\Conversation;
use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    // Trouver les messages d'une conversation (avec pagination)
    public function findByConversation(
        Conversation $conversation,
        int $limit = 50,
        int $offset = 0
    ): array {
        return $this->createQueryBuilder('m')
            ->where('m.conversation = :conversation')
            ->setParameter('conversation', $conversation)
            ->orderBy('m.createdAt', 'ASC')
            ->setMaxResults($limit)
            ->setFirstResult($offset)
            ->getQuery()
            ->getResult();
    }

    // Compter les messages
    public function countByConversation(Conversation $conversation): int
    {
        return (int) $this->createQueryBuilder('m')
            ->select('COUNT(m.id)')
            ->where('m.conversation = :conversation')
            ->setParameter('conversation', $conversation)
            ->getQuery()
            ->getSingleScalarResult();
    }
}