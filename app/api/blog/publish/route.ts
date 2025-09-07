import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog/blogService';
import { supabase } from '@/lib/supabase/client';
import { BlogPost } from '@/lib/blog/types';

// API endpoint for publishing blog posts from n8n workflow
export async function POST(request: NextRequest) {
  try {
    // Verify API key for security
    const authHeader = request.headers.get('authorization');
    const expectedApiKey = process.env.CMS_API_KEY;
    
    if (!authHeader || !expectedApiKey) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }

    const providedKey = authHeader.replace('Bearer ', '');
    if (providedKey !== expectedApiKey) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { post, schema } = body;

    if (!post) {
      return NextResponse.json(
        { error: 'Post data is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ['title', 'slug', 'content'];
    const missingFields = requiredFields.filter(field => !post[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingPost = await BlogService.getPostBySlug(post.slug);
    if (existingPost) {
      return NextResponse.json(
        { error: `A post with slug '${post.slug}' already exists` },
        { status: 409 }
      );
    }

    // Prepare blog post data
    const blogPostData: Partial<BlogPost> = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      seo_title: post.title, // Use title if no specific SEO title
      meta_description: post.excerpt || post.meta_description,
      featured_image_url: post.featuredImage,
      alt_text: post.altText,
      focus_keyword: post.focusKeyword,
      keywords: Array.isArray(post.tags) ? post.tags : 
                (typeof post.tags === 'string' ? [post.tags] : []),
      status: post.status === 'publish' ? 'published' : 'draft',
      season: post.categories?.find((cat: string) => 
        ['spring', 'summer', 'fall', 'winter'].includes(cat.toLowerCase())
      )?.toLowerCase() as any,
      publish_date: post.publishDate || new Date().toISOString().split('T')[0],
    };

    // Only set published_at if status is published
    if (blogPostData.status === 'published') {
      blogPostData.published_at = new Date().toISOString();
    }

    // Create the blog post in the database
    const createdPost = await BlogService.createBlogPost(blogPostData);

    // Log the successful creation
    console.log(`Blog post created successfully: ${createdPost.id} - ${createdPost.title}`);

    // Return success response with post ID
    return NextResponse.json({
      success: true,
      id: createdPost.id,
      slug: createdPost.slug,
      status: createdPost.status,
      message: 'Blog post published successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error publishing blog post:', error);
    
    // Return detailed error for debugging (remove in production)
    return NextResponse.json({
      error: 'Failed to publish blog post',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// GET endpoint to verify the API is working
export async function GET() {
  return NextResponse.json({
    message: 'Blog publishing API is active',
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: 'Publish new blog post',
      PUT: 'Update existing blog post (not implemented)',
      DELETE: 'Delete blog post (not implemented)'
    }
  });
}

// PUT endpoint for updating existing posts
export async function PUT(request: NextRequest) {
  try {
    // Verify API key
    const authHeader = request.headers.get('authorization');
    const expectedApiKey = process.env.CMS_API_KEY;
    
    if (!authHeader || !expectedApiKey || authHeader.replace('Bearer ', '') !== expectedApiKey) {
      return NextResponse.json(
        { error: 'Invalid authorization' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, post } = body;

    if (!id || !post) {
      return NextResponse.json(
        { error: 'Post ID and post data are required' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: Partial<BlogPost> = {};
    
    if (post.title) updateData.title = post.title;
    if (post.content) updateData.content = post.content;
    if (post.excerpt) updateData.meta_description = post.excerpt;
    if (post.featuredImage) updateData.featured_image_url = post.featuredImage;
    if (post.altText) updateData.alt_text = post.altText;
    if (post.status) {
      updateData.status = post.status === 'publish' ? 'published' : 'draft';
      if (updateData.status === 'published' && !updateData.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    // Update the blog post
    const updatedPost = await BlogService.updateBlogPost(id, updateData);

    return NextResponse.json({
      success: true,
      id: updatedPost.id,
      slug: updatedPost.slug,
      status: updatedPost.status,
      message: 'Blog post updated successfully'
    });

  } catch (error) {
    console.error('Error updating blog post:', error);
    
    return NextResponse.json({
      error: 'Failed to update blog post',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}