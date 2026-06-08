'use client'

import { useAuth } from '@/app/components/AuthProvider'
import { voteProposalAction } from '@/lib/actions'
import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase-client'

export default function VoteButton({ 
  proposalId, 
  upvoteCount: initialUpvoteCount, 
  isPinned,
  path,
  small = false
}: { 
  proposalId: string
  upvoteCount: number
  isPinned: boolean
  path: string
  small?: boolean
}) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [displayCount, setDisplayCount] = useState(initialUpvoteCount)

  // Sync display count when server changes it
  useEffect(() => {
    setDisplayCount(initialUpvoteCount)
  }, [initialUpvoteCount])

  // Setup real-time listener for user's upvote state
  useEffect(() => {
    if (!user) {
      setHasVoted(false)
      return
    }
    const voteRef = doc(db, 'proposals', proposalId, 'votes', user.uid)
    const unsubscribe = onSnapshot(voteRef, (snap) => {
      setHasVoted(snap.exists())
    }, (err) => {
      console.error('Error listening to vote status:', err)
    })
    return () => unsubscribe()
  }, [proposalId, user])

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || isPinned || loading) return

    // Save previous state for rollback
    const prevHasVoted = hasVoted
    const prevDisplayCount = displayCount

    // Optimistic toggle
    const newHasVoted = !prevHasVoted
    const newDisplayCount = prevDisplayCount + (newHasVoted ? 1 : -1)

    setHasVoted(newHasVoted)
    setDisplayCount(newDisplayCount)
    setLoading(true)

    const formData = new FormData()
    formData.append('proposalId', proposalId)
    formData.append('uid', user.uid)
    formData.append('path', path)

    const res = await voteProposalAction(formData)
    setLoading(false)

    if (res?.error) {
      // Rollback on failure
      setHasVoted(prevHasVoted)
      setDisplayCount(prevDisplayCount)
      alert(res.error)
    }
  }

  const iconSize = small ? '12' : '16'

  return (
    <form onSubmit={handleVoteSubmit}>
      <button
        type="submit"
        className={`upvote-btn ${loading ? 'active' : ''} ${hasVoted ? 'voted' : ''}`}
        disabled={!user || isPinned || loading}
        title={!user ? 'Sign in to vote' : isPinned ? 'Pinned by admin' : hasVoted ? 'Remove upvote' : 'Upvote'}
        style={small ? { padding: '0.25rem 0.5rem', minWidth: '40px', gap: '0.125rem' } : undefined}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
        <span className="count" style={small ? { fontSize: '0.75rem' } : undefined}>
          {displayCount}
        </span>
      </button>
    </form>
  )
}
